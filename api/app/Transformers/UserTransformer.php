<?php namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\User;

class UserTransformer extends TransformerAbstract
{
    protected $defaultIncludes;
    private $rolesPermission;
    
    public function __construct(array $includes = ['roles'])
    {
        $this->defaultIncludes = (in_array('roles', $includes)) ? ['roles'] :[];
        $this->rolesPermission = (in_array('permissions', $includes)) ? ['permissions'] :[];
    }
    
    public function transform(User $item)
    {
        return [
            'id'            => (int)$item->id,
            'parent_id'     => (int)$item->parent_id,
            'email'         => $item->email,
            'lastname'      => $item->lastname,
            'status'        => (int)$item->status,
            'firstname'     => $item->firstname,
            'phone'         => $item->phone,
            'pool'          => [
                                'pool_id'       => (int)$item->pool_id,
                                'pool_name'     => $item->pool_name
                               ],
            'plan'          => [
                                'quota'         => (int)$item->quota,
                                'credit'        => (int)$item->credit,
                                'consumed'      => (int)$item->consumed,
                               ],
            'campaigns_total'=> (int)$item->campaigns_total,
            'language_id'   => (int)$item->language_id,
            'timezone'      => $item->timezone,
            'birthday'      => $item->birthday,
            'country'       => $item->country,
            'gender'        => $item->gender,
            'address'       => $item->address,
            'zip_code'      => $item->zip_code,
            'phone'         => $item->phone,
            'cellphone'     => $item->cellphone,
            'last_login_at' => $item->last_login,
            'created_at'    => $item->created_at,
            'updated_at'    => $item->updated_at,
        ];
    }

    public function includeRoles(User $item)
    {
        $roles = $item->roles;

        return $this->collection($roles, new RoleTransformer($this->rolesPermission), null);
    }
    
}


