<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablesCampaingsAndCampaignsLists extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('campaigns', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->integer('user_id')->unsigned();
            $table->boolean('status');
            $table->string('name');
            $table->string('subject');
            $table->text('body');
            $table->datetime('scheduled');
            $table->string('from_name');
            $table->string('from_email');
            $table->string('reply_name');
            $table->string('reply_email');
            $table->timestamps();
            $table->softDeletes();
            
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('campaigns_lists', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->bigInteger('campaign_id')->unsigned();
            $table->bigInteger('list_id')->unsigned();
           
            $table->foreign('campaign_id')->references('id')->on('campaigns')
                ->onUpdate('cascade')->onDelete('cascade');
           
            $table->foreign('list_id')->references('id')->on('lists')
                ->onUpdate('cascade')->onDelete('cascade');
           
            $table->primary(['campaign_id','list_id']);
           
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
        Schema::drop('campaigns_lists');
        Schema::drop('campaigns');
    }
}
