<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablesUsersAndPasswordResets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('parent_id')->unsigned();
            $table->string('lastname')->nullable();
            $table->string('firstname')->nullable();
            $table->string('email')->unique();
            $table->tinyInteger('status')->default(1);
            $table->string('password', 100);
            $table->rememberToken();
            $table->smallInteger('language_id')->unsigned();
            $table->string('timezone')->nullable();
            $table->date('birthday')->nullable();
            $table->char('country',4)->nullable();
            $table->string('gender',1)->nullable();
            $table->string('address')->nullable();
            $table->string('zip_code',20)->nullable();
            $table->string('phone',20)->nullable();
            $table->string('cellphone',20)->nullable();
            $table->dateTime('last_login');
            $table->softDeletes();
            $table->timestamps();
        });
        
        Schema::create('password_resets',function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->string('email');
            $table->string('token')->nullable();
            $table->datetime('created_at');
            $table->primary('email');
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
        Schema::drop('password_resets');
        Schema::drop('users');
    }
}
