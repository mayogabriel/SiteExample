<?php

namespace App\Http\Requests\Api\Backend\Contact\ContactList;

use App\Http\Requests\Request;
use \Illuminate\Contracts\Validation\Validator;
use App\Exceptions\ResourceException;

class UpdateContactListRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'      => 'required|string|min:3|max:100',
            'status'    => 'required|boolean'
        ];
    }
    
    protected function formatErrors(Validator $validator){

        throw new ResourceException($validator->errors()->first());

    }
}
