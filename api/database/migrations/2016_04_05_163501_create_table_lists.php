<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLists extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('lists', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->integer('user_id')->unsigned();
            $table->boolean('status');
            $table->string('name');
            $table->integer('total_contacts')->unsigned;
            $table->integer('total_actives')->unsigned;
            $table->integer('total_inactives')->unsigned;
            $table->integer('total_complaints')->unsigned;
            $table->integer('total_bounced')->unsigned;
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
        //
        Schema::drop('lists');
    }
}
