<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableCustomFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*Schema::table('custom_fields', function($table){
            $table->string('value',1000)->nullable();
            $table->boolean('required')->default(0);
            $table->tinyInteger('min')->unsigned();
            $table->smallInteger('max')->unsigned();
        });*/
                
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*Schema::table('custom_fields', function($table){
           $table->dropColumn('max');
           $table->dropColumn('min');
           $table->dropColumn('required');
           $table->dropColumn('value');
        });*/
    }
}
