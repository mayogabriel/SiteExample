<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'payments';
    
    protected $fillable = [
                            'id',
                            
                            
                        ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
}
