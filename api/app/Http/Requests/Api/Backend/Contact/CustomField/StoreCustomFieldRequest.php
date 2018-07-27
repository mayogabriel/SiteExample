<?php

namespace App\Http\Requests\Api\Backend\Contact\CustomField;

use App\Http\Requests\Request;
use \Illuminate\Contracts\Validation\Validator;
use App\Exceptions\ResourceException;

class StoreCustomFieldRequest extends Request
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
            'name'                      => 'required|string|min:3|max:255',
            'field_type'                => 'required|in:text_field,hidden_field,check_box,radio_button,text_area,password_field',
            'validation'                => 'required|in:do_not_apply,numeric_only,alpha_only,alpha_numeric_only,email_format_check,custom',
            'validation_custom_regex'   => 'required_if:validation,custom|regex_valid',
            'value'                     => 'required|array',
            'required'                  => 'something|boolean'
        ];
    }
    
    protected function formatErrors(Validator $validator){

        throw new ResourceException($validator->errors()->first());

    }
}
