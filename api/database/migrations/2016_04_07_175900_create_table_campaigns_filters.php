<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCampaignsFilters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('campaigns_filters', function(Blueprint $table){
           $table->engine='InnoDB';
           $table->bigIncrements('id');
           $table->bigInteger('campaign_id')->unsigned();
           $table->bigInteger('list_id')->unsigned();
           $table->bigInteger('field_id')->unsigned();
           $table->string('condition',10);
           $table->string('value');
           $table->timestamps();
           $table->softDeletes();
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
        Schema::drop('campaigns_filters');
    }
}
