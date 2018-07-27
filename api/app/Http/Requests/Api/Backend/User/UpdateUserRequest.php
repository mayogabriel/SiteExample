<?php

namespace App\Http\Requests\Api\Backend\User;

use App\Http\Requests\Request;
use App\Exceptions\ResourceException;
use \Illuminate\Contracts\Validation\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use App\Models\Pool;

class UpdateUserRequest extends Request
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
            'parent_id' => 'numeric',
            'lastname'  => 'required|string|min:3|max:255',
            'firstname' => 'required|string|min:3|max:255',
            'email'     => 'required|unique:users,email,'.$this->route()->getParameter('id'),
            'password'  => 'min:8|max:16',
            'status'    => 'boolean',
            'roles'     => 'array|integerInArray|existsInArray:'.Config::get('entrust.roles_table').',id',
            'pool_id'   => 'numeric',
            'language_id'   => 'exists:languages,id',
            'timezone'  => 'timezone',
            'birthday'  => 'date',
            'gender'    => 'in:M,F',
            'address'   => 'string|max:255',
            'ip'        => 'string|max:20',
            'zip_code'  => 'string|max:20',
            'phone'     => 'string|max:20',
            'cellphone' => 'string|max:20'
        ];
    }
    
    protected function formatErrors(Validator $validator){

        throw new ResourceException($validator->errors()->first());

    }
    
    
    protected function getValidatorInstance()
    {   
        return parent::getValidatorInstance()->after(function($validator){
            $this->after($validator);
        });
    }
    
    
    public function after($validator){
        if(Input::has('parent_id') && Input::get('parent_id')){
            if(!$user_parent = User::find(Input::get('parent_id')))
                return $validator->errors()->add('parent_id', 'User not found ');
                
            if(!$user_parent->hasRole('reseller')){
                return $validator->errors()->add('parent_id', 'Parent not permission '); 
            }
        }
        
        if(Input::has('pool_id') && Input::get('pool_id')){
            $pool = Pool::find(Input::get('pool_id'));
            if(!is_object($pool)){
                $validator->errors()->add('pool_id', 'Pool id not found'); 
            }
        }
    }
}
