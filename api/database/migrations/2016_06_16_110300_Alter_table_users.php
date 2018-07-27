<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('users', function(Blueprint $table){
           $table->integer('pool_id')->unsigned()->nullable()->after('remember_token');
           
           $table->foreign('pool_id')->references('id')->on('pools')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function($table){
            $table->dropForeign(['pool_id']);
            $table->dropColumn('pool_id');
        });
    }
}
