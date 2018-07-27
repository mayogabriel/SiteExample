<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentType extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'payments_types';
    
    protected $fillable = [
                            'id',
                            'name'
                            
                        ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
}
