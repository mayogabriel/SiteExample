<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pool extends BaseModel
{
    protected $table = 'pools';
    
    protected $fillable = [
                            'id', 
                            'name', 
                            'status'
                        ];
    
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
    
    
}
