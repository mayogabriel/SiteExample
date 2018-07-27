<?php

namespace App\Jobs;

use \App\Jobs\Job;
use \App\Models\User;
use \Illuminate\Contracts\Bus\SelfHandling;
use \Illuminate\Contracts\Queue\ShouldQueue;
use \Illuminate\Queue\InteractsWithQueue;
use \Illuminate\Queue\SerializesModels;
use \Maatwebsite\Excel\Facades\Excel;
use \App\Models\Notification;

class UserExport extends Job implements SelfHandling, ShouldQueue
{
    use InteractsWithQueue, SerializesModels;
    
    private $request;
    private $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($request, $user)
    {

        $this->request = $request;
        $this->user = $user;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        
        $users = User::query();
        
        
        if (Input::has('ids')) {
            $users = $users->whereIn('users.id', Input::get('ids'));
        }
        
        //Filter
        if (Input::has('search')) {
            $users = $users->whereRaw('(lastname like "%'.Input::get('search').'%" or firstname like "%'.Input::get('search').'%" or email like "%'.Input::get('search').'%")');
        }

        if (Input::has('role_ids')) {
            $users = $users->whereHas('roles', function ($q) {
                $q->whereIn('id', Input::get('role_ids'));
            });
        }
        
        if (Input::has('parent_id')) {
            $users = $users->where('parent_id', '=', Input::get('parent_id'));
        }
        
        if (Input::has('created_at_min')) {
            $users = $users->where('created_at', '>=', Input::get('created_at_min'));
        }
        
        if (Input::has('created_at_max')) {
            $users = $users->where('created_at', '<=', Input::get('created_at_max'));
        }
        
        $users->leftJoin('periods', function($join){
            $join->on('users.id','=','periods.user_id')
                    ->where('start_date','<=',date('Y-m-d'))
                    ->where('end_date','>=',date('Y-m-d'));
        });
        
        $users->leftJoin('campaigns', function($join){
            $join->on('users.id','=','campaigns.user_id')
                    ->where('campaigns.status','=',1);
        });
        $users->select(
                'users.*', 
                DB::raw('count(campaigns.user_id) as campaigns_total'),
                'periods.quota as quota',
                'periods.credit as credit',
                'periods.consumed as consumed'
                );
        $users->groupBy('campaigns.user_id');
        
        
        if (Input::has('order_field')){
            $order_value    =   (Input::has('order_value')) ? Input::get('order_value'):'asc';
            $users          =   $users->orderBy(Input::get('order_field') , $order_value);
        }
        else{
            $users          =   $users->orderBy('users.id' , 'asc');
        }
        
        
        $users = $users->get()->toArray();
        
        
        Excel::create('users_exports__'.date('YmdHis'), function($excel) use($users) {

            $excel->sheet('Users', function($sheet)  use($users) {

                $sheet->fromArray($users);

            });

        })->store('xlsx');
        
        
        
        $n = new Notification();
        $n->user_id = $this->user;
        $n->description = 'Export user finished';
        $n->save();
        
    }
}
