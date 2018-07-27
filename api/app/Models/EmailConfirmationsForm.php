<?php

namespace App\Models;

class EmailConfirmationsForm extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'email_confirmations_form';
    
    protected $fillable = [
                            'id', 
                            'subscription_form_id',
                            'subject',
                            'from',
                            'reply_to',
                            'design_data'
                        ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
    
    /**
     * The attributes that should be casted to native types.
     *
     *  @var array
     */
    protected $casts = [
        'design_data' => 'array'
    ];
}
