<?php namespace App\Http\Controllers\Api;

use Input;
use Cache;
use Response;
use Validator;
use Config;
use \Illuminate\Support\Facades\DB;

use App\Http\Controllers\Api\LogController;

use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Models\User;
use App\Transformers\UserTransformer;

use Illuminate\Support\Facades\Redirect;

use App\Http\Requests\Api\Backend\User\IndexUserRequest;
use App\Http\Requests\Api\Backend\User\StoreUserRequest;
use App\Http\Requests\Api\Backend\User\UpdateUserRequest;

use App\Jobs\UserExport;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\UserDeletedDeniedException;



class UserController extends ApiController
{

    use DispatchesJobs;
    
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(IndexUserRequest $request)
    {

        $users = User::query();
        
        $users  ->indexSelect()
                ->indexWhere()
                ->indexFilter()
                // join
                ->periods()
                ->campaigns()
                
                ->indexGroupBy()
                ->indexOrder();
        
        $usersData = $users->paginate(Input::get('limit', 30));

        return response()->paginator($usersData, new UserTransformer());
    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id, $relation = ['roles'])
    {

        $user = User::find($id);
        $this->checkExist($user);

        return response()->item($user, new UserTransformer($relation));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = new User($request->all());
       
        $user->save();
        if(Input::has('roles')){
            $user->roles()->sync(Input::get('roles', []));
        }
        
        LogController::save('Store user', $request->all());
        
        return $this->show($user->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        
        $user = User::find($id);
        $this->checkExist($user);
        $user->fill($request->all());

        $user->save();
        
        if (Input::has('roles')) {
            $user->roles()->sync(Input::get('roles', []));
        }
        
        LogController::save('Update user', $request->all());

        return $this->show($user->id);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        // Check not delete user login
        if(Auth::user()->id == $id){
            throw new UserDeletedDeniedException();
        } 
        
        $user = User::find($id);
        $this->checkExist($user);
        $user->delete();
        
        LogController::save('Delete user', $id);

        return response()->return();
    }
    
    
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function export(IndexUserRequest $request)
    {

        //dd($this->dispatch(new UserExport($request->all(), Auth::user()->id)));

        return response()->return();

    }

}
