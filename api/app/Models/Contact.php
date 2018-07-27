<?php

namespace App\Models;

use \Jenssegers\Mongodb\Eloquent\Model as Moloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;


class Contact extends Moloquent 
{
    use SoftDeletes;
    
    protected $connection = 'mongodb';
    
    protected $fillable = [
                            'id', 
                            'user_id',
                            'status',
                            'email'
                            
                        ];
    protected $hidden = ['password','remember_token','last_login', 'deleted_at', 'created_at', 'updated_at'];
    protected $dates = ['deleted_at'];
    public $timestamps = true;
}
