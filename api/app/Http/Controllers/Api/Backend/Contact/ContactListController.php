<?php

namespace App\Http\Controllers\Api\Backend\Contact;

use Input;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\ContactList;
use Illuminate\Support\Facades\Auth;
use App\Transformers\ContactListTransformer;
use App\Http\Controllers\Api\Backend\ApiController;
use App\Http\Requests\Api\Backend\Contact\ContactList\UpdateContactListRequest;
use App\Http\Requests\Api\Backend\Contact\ContactList\StoreContactListRequest;
use App\Http\Controllers\Api\LogController;

class ContactListController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($user_id = false)
    {
        if(empty($user_id)){
            $user_id = Auth::user()->id;
        }
        
        $lists = ContactList::query()->where('user_id','=',$user_id);
        
        //Filter
        if (Input::has('search')) {
            $lists = $lists->where('name', 'like', "%".Input::get('search')."%");
        }
        $lists = $lists->orderBy('id', 'desc');
        $lists = $lists->paginate(Input::get('limit', 1000));
        
        return response()->paginator($lists, new ContactListTransformer);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(StoreContactListRequest $request)
    {
        //
        $list = new ContactList();
        $list->name = $request->name;
        $list->user_id = Auth::user()->id;
        $list->save();
        
        LogController::save('Store contact list', $request->all());
        
        return $this->show($list->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $contactList = ContactList::find($id);
        
        $messageError = 'Hubo un error al recuperar la Lista'; // esto es temporario
        $this->checkExist($contactList, $messageError);

        return response()->item($contactList, new ContactListTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(UpdateContactListRequest $request, $id)
    {
        $contactList = ContactList::find($id);
        $this->checkExist($contactList);
        
        $contactList->name = $request->name;
        $contactList->status= $request->status;
        $contactList->save();
        
        LogController::save('Update contact list', $request->all());

        return $this->show($contactList->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $contactList = ContactList::find($id);
        $this->checkExist($contactList);
        $contactList->delete();
        
        LogController::save('Delete contact list', $id);

        return response()->return();
    }
}
