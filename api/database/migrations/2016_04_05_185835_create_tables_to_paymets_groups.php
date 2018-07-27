<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablesToPaymetsGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('payments_types', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name',45);
            $table->timestamps();
            $table->softDeletes();
        });
        
        Schema::create('plans', function( Blueprint $table){
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('payment_type_id')->unsigned();
            $table->string('name',100);
            $table->boolean('status');
            $table->boolean('type');
            $table->decimal('value',10,3);
            $table->integer('expiration_time')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        
        Schema::create('contracts', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->integer('plan_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->boolean('status');
            $table->datetime('date');
            $table->date('expiration_date')->nullable();
            $table->datetime('cut_off_date');
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('payments_mode', function(Blueprint $table){
           $table->engine = 'InnoDB';
           $table->increments('id');
           $table->string('name',45);
           $table->timestamps();
           $table->softDeletes();
        });
        
        Schema::create('invoices', function(Blueprint $table){
            $table->engine='InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->decimal('amount',9,3);
            $table->date('date');
            $table->date('expiration_date');
            $table->string('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
        });
        
        Schema::create('payments', function(Blueprint $table){
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->bigInteger('contract_id')->unsigned();
            $table->integer('payment_mode_id')->unsigned();
            $table->integer('plan_id')->unsigned();
            $table->integer('invoice_id')->unsigned();
            $table->datetime('payment_date');
            $table->decimal('amount',9,6);
            $table->string('transaction_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('contract_id')->references('id')->on('contracts')
                ->onUpdate('cascade')->onDelete('cascade');
            
            
            $table->foreign('payment_mode_id')->references('id')->on('payments_mode')
                ->onUpdate('cascade')->onDelete('cascade');
            
            
            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');
            
            
            $table->foreign('invoice_id')->references('id')->on('invoices')
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
        Schema::drop('payments');
        Schema::drop('invoices');
        Schema::drop('payments_mode');
        Schema::drop('contracts');
        Schema::drop('plans');
        Schema::drop('payments_types');
    }
}
