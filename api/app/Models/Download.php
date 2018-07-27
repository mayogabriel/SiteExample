<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;


class Download extends BaseModel
{
    //
    use TimestampsFormatTrait;
    use SoftDeletes;

    protected $table = 'downloads';
    
    protected $fillable = [
                            'id', 
                            'user_id', 
                            'description'
                        ];
    
    protected $hidden = [ 'deleted_at', 'created_at', 'updated_at'];
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
    
}
