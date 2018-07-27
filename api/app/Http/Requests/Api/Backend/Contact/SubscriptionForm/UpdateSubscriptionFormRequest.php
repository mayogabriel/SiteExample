<?php

namespace App\Http\Requests\Api\Backend\Contact\CustomField;

use App\Http\Requests\Request;
use \Illuminate\Contracts\Validation\Validator;
use App\Exceptions\ResourceException;

class UpdateSubscriptionFormRequest extends Request
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
            'id'                            => 'required|integer|exists:subscriptions_form:id',
            'lists_ids'                     => 'required|array',
            'custom_fields_ids'             => 'required|array',
            'custom_fields_ids_required'    => 'required|array',
            'design_data'                   => 'required|array',
        ];
    }
    
    protected function formatErrors(Validator $validator){

        throw new ResourceException($validator->errors()->first());

    }
}
