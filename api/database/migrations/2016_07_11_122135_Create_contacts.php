<?php

use Jenssegers\Mongodb\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class CreateContacts extends Migration
{
    
    //protected $connection = 'mongodb';
    
    public function __call($method, $args)
    {
            // Dummy.
            return $this;
    }
        
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*Schema::connection($this->connection)->table('contacts', function(Blueprint $collection){
            $collection->unique(['user_id','email']);
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::connection($this->connection)->table('contacts', function(Blueprint $collection){
            $collection->dropUnique(['user_id','email']);
        });*/
    }
}
