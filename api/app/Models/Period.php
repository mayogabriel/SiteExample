<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Period extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'periods';
    
    protected $fillable = [
                            'id',
                            'user_id',
                            'start_date',
                            'end_date',
                            'quota',
                            'credit',
                            'consumed'
                        ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
    
}
