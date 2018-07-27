<?php

namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;
use \Maatwebsite\Excel\Facades\Excel;
use \Illuminate\Database\QueryException;

class ImportContact extends Job implements SelfHandling, ShouldQueue
{
    use InteractsWithQueue, SerializesModels;
    
    protected $user_id;
    protected $fields;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_id, $fields)
    {
        $this->user_id = $user_id;
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $user_id = $this->user_id;

        ini_set('set_time_limit',0);
        $mInit = memory_get_usage();
        /*Excel::filter('chunk')->load(storage_path('imports').'/contacts.csv')->chunk(1000, function($results) use ($user_id)
        {
            //global $user_id;
            foreach($results as $row){
                $mail = $row->email;
                if (filter_var($mail, FILTER_VALIDATE_EMAIL) === true) {
                    try{
                        $c = new \App\Models\Contact();
                        $c->user_id = $user_id;
                        $c->email = $mail;
                        $c->save();
                    } catch (\MongoCursorException $e) {
                        //\Illuminate\Contracts\Logging\Log::error('error');
                        //dd('aca');
                    }
                }
            }
        });*/
        
        for($i=1;$i<40000;$i++){
            try{
                /*$c = new \App\Models\Contact();
                $c->user_id = $user_id;
                $c->email = 'nniejadlik@gmail.com';
                $c->save();*/
             \App\Models\Contact::create(['user_id'=>$user_id,'email'=>'nniejadlik@gmail.com'.rand(0,9999999999).date('YmdHis')]);
            } catch (\MongoCursorException $e) {
                //\Illuminate\Contracts\Logging\Log::error('error');
                //dd('aca');
            }
            sleep(1);
        }
        $mFin = memory_get_usage();
        \Illuminate\Support\Facades\Storage::disk('local')->put('memory.txt', 'memory_init:'.$mInit."\n".'memory_fin'.$mFin);
        
        //$c = \App\Models\Contact::find('5783edfe2e8a40ef168b4567');
    }

}
