<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscriptionsForm extends BaseModel
{
    use SoftDeletes;
    use TimestampsFormatTrait;
    
    protected $table = 'subscriptions_form';
    
    protected $fillable = [
                            'id', 
                            'name',
                            'lists_ids',
                            'custom_fields_ids',
                            'custom_fields_ids_required',
                            'design_data'
                        ];
    protected $hidden = [
                            'user_id',
                            'deleted_at', 
                            'created_at', 
                            'updated_at'
                        ];
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
    
    /**
     * The attributes that should be casted to native types.
     *
     *  @var array
     */
    protected $casts = [
        'lists_ids' => 'array',
        'custom_fields_ids' => 'array',
        'custom_fields_ids_required' => 'array',
        'design_data' => 'array'
    ];
    
    /**
     * Get the Email Confirmation record associated with the Subscription Form.
     */
    
    public function SubscriptionEmailConfirmation() {
        return $this->hasOne('App\Models\EmailConfirmationsForm');
    }
}
