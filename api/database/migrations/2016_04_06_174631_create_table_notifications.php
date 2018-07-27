<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableNotifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('notifications', function(Blueprint $table){
           $table->engine='InnoDB';
           $table->bigIncrements('id');
           $table->integer('user_id')->unsigned();
           $table->string('description',500);
           $table->boolean('status');
           $table->timestamps();
           $table->softDeletes();
           
           $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('notifications');
    }
}
