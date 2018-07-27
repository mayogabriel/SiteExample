<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablesSettingsLimits extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('settings_limits', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->enum('application',['backend']);
            $table->string('type', 128)->index();
            $table->string('name', 128);
            $table->string('value', 128);
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['application','type','name']);
        });
        
        
        Schema::create('settings_limits_roles', function(Blueprint $table){
           $table->engine = 'InnoDB';
           $table->increments('id');
           $table->integer('setting_limit_id')->unsigned();
           $table->integer('role_id')->unsigned();
           
           $table->foreign('setting_limit_id')->references('id')->on('settings_limits_roles')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        
        Schema::create('settings_limits_users', function(Blueprint $table){
           $table->engine = 'InnoDB';
           $table->increments('id');
           $table->integer('setting_limit_id')->unsigned();
           $table->integer('user_id')->unsigned();
           
           $table->foreign('setting_limit_id')->references('id')->on('settings_limits_roles')
                ->onUpdate('cascade')->onDelete('cascade');
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
        Schema::drop('settings_limits_users');
        Schema::drop('settings_limits_roles');
        Schema::drop('settings_limits');
    }
}
