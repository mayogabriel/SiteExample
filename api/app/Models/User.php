<?php namespace App\Models;
use Hash;
use Input;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Language;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\Backend\Period\PeriodController;

use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends BaseModel implements AuthenticatableContract, CanResetPasswordContract
{
    use TimestampsFormatTrait;
    use EntrustUserTrait;
    use SoftDeletes;
    use Authenticatable, CanResetPassword;
    

    protected $table = 'users';
    
    protected $fillable = [
                            'id', 
                            'parent_id', 
                            'lastname', 
                            'firstname', 
                            'email', 
                            'status', 
                            'pool_id', 
                            'language_id', 
                            'timezone', 
                            'birthday', 
                            'country', 
                            'gender', 
                            'address', 
                            'zip_code', 
                            'phone', 
                            'cellphone',
                            'password'
                            
                        ];
    protected $hidden = ['password','remember_token','last_login', 'deleted_at', 'created_at', 'updated_at'];
    public $timestamps = true;
    
    protected $dates = ['deleted_at'];

    public function setPasswordAttribute($pass){
        $this->attributes['password'] = Hash::make($pass);
    }
    
    public function getLanguageCodeAttribute(){
        if($this->language_id>0){
           $lang = Language::find($this->language_id);
           return $lang->code;
        }
        else{
            return null;
        }
    }
    
    public function getLanguageNameAttribute(){
        if($this->language_id>0){
           $lang = Language::find($this->language_id);
           return $lang->name;
        }
        else{
            return null;
        }
    }
    
    public function getPoolNameAttribute(){
        if($this->pool_id>0 && !empty($this->pool_id)){
           $pool = Pool::find($this->pool_id);
           return $pool->name;
        }
        else{
            return null;
        }
    }
    
    public function getLanguageAttribute(){
        if($this->language_id>0){
           $lang = Language::find($this->language_id);
           return $lang;
        }
        else{
            return null;
        }
    }
    
    /************ JOIN ************/
    // Periods
    public function scopePeriods($query) {
        $query->leftJoin('periods', function($join){
            $join->on('users.id','=','periods.user_id')
                            ->where('start_date','<=',date('Y-m-d'))
                            ->where('end_date','>=',date('Y-m-d'));
        });
    }
    // Campaigns
    public function scopeCampaigns($query) {
        $query->leftJoin('campaigns', function($join){
            $join->on('users.id','=','campaigns.user_id')
                    ->where('campaigns.status','=',1);
        });
    }
    
    /**
     * Build Name Method : scope[methodCtrl][ActionQuery] -- camel case
     */
    
    /************ SELECT ************/
    public function scopeIndexSelect($query) {
        $query->select('users.*',
                       DB::raw('count(campaigns.id) as campaigns_total'),
                       'periods.quota as quota',
                       'periods.credit as credit',
                       'periods.consumed as consumed');
    }
    
    /************ WHERE ************/
    public function scopeIndexWhere($query){
        $query->where('parent_id', '=', Input::get('parent_id', 0));
    }
    
    /************ FILTERS ************/
    public function scopeIndexFilter($query){       
        // Order
        if (Input::has('order_field')){
            $query->orderBy(Input::get('order_field') , Input::get('order_value', 'asc'));
        }
        // Where
        $query->where('parent_id', '=', Input::get('parent_id', 0));
        
        if (Input::has('search')) {
            $query->whereRaw('(lastname like "%'.Input::get('search').'%" or firstname like "%'.Input::get('search').'%" or email like "%'.Input::get('search').'%")');
        }
        
        if (Input::has('role_ids')) {
            $query->whereHas('roles', function ($q) {
                $q->whereIn('id', Input::get('role_ids'));
            });
        }
        
        if (Input::has('created_at_min')) {
            $query->where('users.created_at', '>=', Input::get('created_at_min'));
        }
    }
    
    /************ ORDER ************/
    public function scopeIndexOrder($query){
        $query->orderBy('users.id' , 'desc');
    }
    
    /************ GROUP BY ************/
    public function scopeIndexGroupBy($query){
        $query->groupBy('campaigns.user_id');;
    }
    
    
}
