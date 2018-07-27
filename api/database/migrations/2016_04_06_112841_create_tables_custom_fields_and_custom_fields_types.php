<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablesCustomFieldsAndCustomFieldsTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('custom_fields', function(Blueprint $table){
           $table->engine='InnoDB';
           $table->bigIncrements('id')->unsigned();
           $table->integer('user_id')->unsigned();
           $table->string('name');
           $table->text('value');
           $table->string('validation_custom_regex')->nullable();
           $table->enum('field_type', ['text_field','hidden_field','check_box','radio_button','text_area','password_field'])->default('text_field');
           $table->enum('validation', ['do_not_apply','numeric_only','alpha_only','alpha_numeric_only','email_format_check','custom'])->default('do_not_apply');
           $table->boolean('required');
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
        Schema::drop('custom_fields');
    }
}
