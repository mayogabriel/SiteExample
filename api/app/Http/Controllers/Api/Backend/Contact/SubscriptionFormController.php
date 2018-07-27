<?php

namespace App\Http\Controllers\Api\Backend\Contact;

use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;

use App\Facades\UserAuth;
use App\Models\SubscriptionsForm;
use App\Http\Requests;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\ApiController;
use App\Transformers\SubscriptionsFormTransformer;


class SubscriptionFormController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $SubscriptionForm = SubscriptionsForm::query()
                                    ->where('user_id', '=', UserAuth::user()->id)
                                    ->orderBy('id', 'desc')
                                    ->paginate(Input::get('limit', 30));
        
        return response()->paginator($SubscriptionForm, new SubscriptionsFormTransformer() );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
        $SubscriptionForm = new SubscriptionsForm($request->all());
        $SubscriptionForm->user_id = UserAuth::user()->id;
        $SubscriptionForm->save();
        
        LogController::save('Store Subscription Form', $request->all());
        
        return $SubscriptionForm;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $SubscriptionForm = SubscriptionsForm::find($id);
        $this->checkExist($SubscriptionForm, 'Hubo un error al recuperar el formulario');

        return response()->item($SubscriptionForm, new SubscriptionsFormTransformer, 'form');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $SubscriptionForm = SubscriptionsForm::find($id);
        $this->checkExist($SubscriptionForm, 'Hubo un error al recuperar el formulario');
        $SubscriptionForm->fill($request->all())->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $SubscriptionForm = SubscriptionsForm::find($id);
        $this->checkExist($SubscriptionForm, 'Hubo un error al recuperar el formulario');
        $SubscriptionForm->delete();
    }
}
