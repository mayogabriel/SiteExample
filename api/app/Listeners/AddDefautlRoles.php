<?php

namespace App\Listeners;

use DB;
use App\Events\UserSignUp;

use Illuminate\Support\Facades\Config;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AddDefautlRoles
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserSignUp  $event
     * @return void
     */
    public function handle(UserSignUp $event)
    {        
        $freemium_role = DB::table(Config::get('entrust.roles_table'))->where('name', '=', 'freemium')->pluck('id');
        $event->user->roles()->attach($freemium_role);
        return false;
    }
}
