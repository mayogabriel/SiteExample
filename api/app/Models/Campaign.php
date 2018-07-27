<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends BaseModel
{
    use SoftDeletes;
    
    protected $table = 'campaigns';
    protected $filliable =  [
                                'id',
                                'user_id',
                                'status',
                                'name',
                                'subject',
                                'body',
                                'scheduled',
                                'from_name',
                                'from_email',
                                'reply_name',
                                'reply_email'
                            ];
    
    protected $hidden = ['created_at', 'update_at', 'deleted_at'];
    
    protected $dates = ['deleted_at'];
    public $timestamps = true;
}
