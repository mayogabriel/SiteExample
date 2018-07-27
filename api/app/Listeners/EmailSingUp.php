<?php

namespace App\Listeners;

use App\Events\UserSignUp;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailSingUp
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
        Mail::send('emails.singup', ['user' => $this->user], function ($m) use ($user) {
            $m->from('hello@send50.info', 'Power Site');

            $m->to($user->email, $user->name)->subject('Bienvendo a Newsmaker');
        });
    }
}
