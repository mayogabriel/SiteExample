<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Auth;

class CustomField extends BaseModel
{
    //
    use SoftDeletes;
    
    protected $table = 'custom_fields';
    protected $nullable = ['validation_custom_regex', 'validation'];
    protected $fillable = [
                            'id',
                            'name',
                            'value',
                            'required',
                            'validation',
                            'validation_custom_regex',
                            'field_type'
                        ];
    
    protected $hidden = [
                            'user_id',
                            'created_at',
                            'updated_at',
                            'deleted_at'
                          ];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
    
    /**
     * The attributes that should be casted to native types.
     *
     *  @var array
     */
    protected $casts = [
        'value' => 'array',
    ];
    
}
