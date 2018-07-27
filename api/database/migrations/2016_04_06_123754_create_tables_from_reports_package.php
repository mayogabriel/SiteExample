<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablesFromReportsPackage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports_users', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->date('date');
            $table->integer('user_id')->unsigned();
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            $table->integer('softbounces')->unsigned()->default(0);
            $table->integer('hardbounces')->unsigned()->default(0);
            $table->integer('suscriptions')->unsigned()->default(0);
            $table->integer('unsuscriptions')->unsigned()->default(0);
            
            $table->primary(['date', 'user_id']);
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('periods', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigIncrements('id');
            $table->integer('user_id')->unsigned();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('quota')->unsigned()->default(0);
            $table->integer('credit')->unsigned()->default(0);
            $table->integer('consumed')->unsigned()->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('reports_campaigns', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigIncrements('campaign_id');
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            $table->integer('softbounces')->unsigned()->default(0);
            $table->integer('hardbounces')->unsigned()->default(0);
            $table->integer('suscriptions')->unsigned()->default(0);
            $table->integer('unsuscriptions')->unsigned()->default(0);
            
            $table->foreign('campaign_id')->references('id')->on('campaigns')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('reports_campaigns_hour', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigInteger('campaign_id')->unsigned();
            $table->tinyInteger('hour')->unsigned();
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            $table->integer('softbounces')->unsigned()->default(0);
            $table->integer('hardbounces')->unsigned()->default(0);
            
            $table->primary(['campaign_id','hour']);
            
            $table->foreign('campaign_id')->references('id')->on('campaigns')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('reports_campaigns_ua', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigInteger('campaign_id')->unsigned();
            $table->string('ua');
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            
            $table->primary(['campaign_id','ua']);
            
            $table->foreign('campaign_id')->references('id')->on('campaigns')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('reports_campaigns_domain', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigInteger('campaign_id')->unsigned();
            $table->string('domain',30);
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            
            $table->primary(['campaign_id','domain']);
            
            $table->foreign('campaign_id')->references('id')->on('campaigns')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('reports_campaigns_country', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigInteger('campaign_id')->unsigned();
            $table->string('country',30);
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            
            $table->primary(['campaign_id','country']);
            
            $table->foreign('campaign_id')->references('id')->on('campaigns')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('reports_campaigns_os', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->bigInteger('campaign_id')->unsigned();
            $table->string('os',30);
            $table->integer('messages')->unsigned()->default(0);
            $table->integer('delivered')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('conversions')->unsigned()->default(0);
            
            $table->primary(['campaign_id','os']);
            
            $table->foreign('campaign_id')->references('id')->on('campaigns')
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
        
        Schema::drop('reports_campaigns_os');
        Schema::drop('reports_campaigns_country');
        Schema::drop('reports_campaigns_domain');
        Schema::drop('reports_campaigns_ua');
        Schema::drop('reports_campaigns_hour');
        Schema::drop('reports_campaigns');
        Schema::drop('periods');
        Schema::drop('reports_users');
    }
}
