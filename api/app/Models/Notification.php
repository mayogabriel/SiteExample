<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends BaseModel
{
    use TimestampsFormatTrait;
    use SoftDeletes;

    protected $table = 'notifications';
    
    protected $fillable = [
                            'id', 
                            'user_id', 
                            'description', 
                            'status'
                        ];
    protected $hidden = [ 'deleted_at', 'created_at', 'updated_at'];
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
}
