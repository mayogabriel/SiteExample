<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSuscriptionForms extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('subscriptions_form', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->integer('user_id')->unsigned();
            $table->text('lists_ids');
            $table->text('custom_fields_ids');
            $table->text('custom_fields_ids_required');
            $table->text('design_data');
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('user_id')->references('id')->on('users');
        });
        
        Schema::create('email_confirmations_form', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('subscription_form_id')->unsigned();
            $table->string('subject');
            $table->string('from');
            $table->string('reply_to');
            $table->text('design_data');
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('subscription_form_id')->references('id')->on('subscriptions_form')->onDelete('cascade');
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
        Schema::drop('subscriptions_form');
        Schema::drop('email_confirmations_form');
    }
}
