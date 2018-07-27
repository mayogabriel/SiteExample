<?php

namespace App\Http\Requests\Api\Backend\User;

use App\Http\Requests\Request;

use App\Exceptions\ResourceException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Config;

class IndexUserRequest extends Request
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
            'ids'            => 'array|integerInArray',
            'page'           => 'integer',
            'created_at_min' => 'date_format:"Y-m-d H:i:s"',
            'created_at_max' => 'date_format:"Y-m-d H:i:s"',
            'updated_at_min' => 'date_format:"Y-m-d H:i:s"',
            'updated_at_max' => 'date_format:"Y-m-d H:i:s"',
            'limit'          => 'integer|min:1|max:250',
            'search'         => 'string',
            'role_ids'       => 'array|integerInArray|existsInArray:'.Config::get('entrust.roles_table').',id',
            'order_field'    => 'in:id,firstname,lastname,email,quota,credit,consumed,campaigns_total,created_at,status',
            'order_value'    => 'in:asc,desc'
        ];
    }
    
    protected function formatErrors(Validator $validator){

        throw new ResourceException($validator->errors()->first());

    }
}
