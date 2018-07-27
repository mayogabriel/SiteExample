<?php

namespace App\Models;

use App\Models\BaseModel;

class Job extends Model
{
    protected $table = 'jobs';
    protected $nullable = [];
    
    protected $fillable = [
                            'id',
                            'payload',
                            'token',
                            'type',
                            'status'
                        ];
    
    
    protected $hidden = [
                            'user_id',
                            'created_at',
                            'updated_at'
                          ];
    
    public $timestamps = true;
    
    /**
     * The attributes that should be casted to native types.
     *
     *  @var array
     */
    protected $casts = [
        'payload' => 'array',
    ];
}
