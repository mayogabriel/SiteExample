<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Model;

class Plan extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'plans';
    
    protected $fillable = [
                            'id',
                            'payment_type_id',
                            'name',
                            'status',
                            'quota',
                            'value',
                            'expiration_time'
                            
                        ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
}
