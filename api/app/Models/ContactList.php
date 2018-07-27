<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class ContactList extends BaseModel{
    use SoftDeletes;
    
    protected $table = 'lists';
    
    protected $fillable = [
                            'user_id',
                            'name',
                            'total_contacts',
                            'total_actives',
                            'total_inactives',
                            'total_complaints',
                            'total_bounced'
                        ];
    
    
    protected $hidden = [
                            'created_at',
                            'updated_at',
                            'deleted_at'
                          ];
    
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];
}
