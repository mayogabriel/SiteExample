<?php namespace App\Http\Controllers\Api\Backend;

use Auth;
use Input, Response, Validator;

use App\Models\User;
use App\Events\UserSignUp;


use UserAuth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

use App\Exceptions\EmailOrPasswordIncorrectException;
use App\Exceptions\ResourceException;
use App\Exceptions\UnauthorizedException;

class AuthController extends ApiController
{

    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard     $auth
     * @param  \Illuminate\Contracts\Auth\Registrar $registrar
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
    
    public function postSignUp()
    {
        // Get input data
        $dataUser = Input::all();

        $validator = Validator::make($dataUser, [
            'lastname'  => 'required|string|min:3|max:255',
            'firstname' => 'required|string|min:3|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:8|max:16',
            'status'    => 'boolean'            
        ]);

        if ($validator->fails()) {
            throw new ResourceException($validator->errors()->first());
        }
        
        $user = new User($dataUser);
        $user->save();
                
        \Event::fire(new UserSignUp($user));                
    }
    
    
    public function postLogin()
    {
        // Get input data
        $credentials = Input::only('email', 'password');

        $validator = Validator::make($credentials, [
            'email'    => 'Required|Between:3,64|Email',
            'password' => 'Required|Min:8|Max:16',
        ]);

        if ($validator->fails()) {
            throw new ResourceException($validator->errors()->first());
        }

        // Try to login
        if (UserAuth::once($credentials)) {
            if (!UserAuth::user()->can('auth.backend')) {
                throw new UnauthorizedException('You do not have permission to access.');
            }
            $payload = app('tymon.jwt.payload.factory')->sub(UserAuth::user()->id)->aud('user')->make();
            $token = JWTAuth::encode($payload);

            return response()->return(['token' => $token->get()]);
        }

        throw new EmailOrPasswordIncorrectException;
    }

    public function postLogout()
    {
        try {
            JWTAuth::parseToken()->invalidate();

            return response()->return();

        } catch (TokenExpiredException $e) {
            return Response::json([
                'status'      => false,
                'status_code' => $e->getStatusCode(),
                'message'     => 'token_expired',
            ], $e->getStatusCode());
        } catch (JWTException $e) {
            return Response::json([
                'status'      => false,
                'status_code' => $e->getStatusCode(),
                'message'     => 'token_invalid',
            ], $e->getStatusCode());
        }
    }

    /**
     * refresh token
     *
     * @return Response
     */
    public function postRefreshToken()
    {
        try {
            $token = JWTAuth::parseToken()->refresh();

            return response()->return(['token' => $token]);

        } catch (TokenExpiredException $e) {
            $token = JWTAuth::parseToken()->refresh();
            return response()->return(['token' => $token]);
        } catch (JWTException $e) {
            return Response::json([
                'status'      => false,
                'status_code' => $e->getStatusCode(),
                'message'     => 'token_invalid',
            ], $e->getStatusCode());
        }
    }
}
