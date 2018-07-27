<?php

namespace App\Http\Controllers\Api\Backend\Contact;

use Input;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\CustomField;
use Illuminate\Support\Facades\DB;
use App\Transformers\CustomFieldTransformer;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Api\Backend\Contact\CustomField\StoreCustomFieldRequest;
use App\Http\Requests\Api\Backend\Contact\CustomField\UpdateCustomFieldRequest;


class CustomFieldController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($user_id=null)
    {
        //
        if(empty($user_id)){
            $user_id = Auth::user()->id;
        }
        
        $cf = CustomField::query()->where('user_id','=',$user_id);
        
        $cf = $cf->paginate(Input::get('limit', 200));
        
        //if(count($cf)>0)
        return response()->paginator($cf, new CustomFieldTransformer);
        /*else
            return response()->json(null);*/
        
        
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(StoreCustomFieldRequest $request)
    {               
        $cf = new CustomField($request->all());
        $cf->user_id = Auth::user()->id;  // set default user logged
        $cf->save();   

        return $this->show($cf->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $cf = CustomField::find($id);
        $this->checkExist($cf);
        
        return response()->item($cf, new CustomFieldTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(UpdateCustomFieldRequest $request, $id)
    {
        $cf = CustomField::find($id);
        $this->checkExist($cf);
        $cf->fill($request->all());
        $cf->save();
                
        return $this->show($cf->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $cf = CustomField::find($id);
        $this->checkExist($cf);
        $cf->delete();
        
        return response()->return();
    }
    
    
    /**
     * Return a listing of the fields types.
     *
     * @return Response
     */
    public function getFieldsTypes(){
        $fieldsTypes = CustomField::getTypes();
        
        return response()->json($fieldsTypes);
    }
}
