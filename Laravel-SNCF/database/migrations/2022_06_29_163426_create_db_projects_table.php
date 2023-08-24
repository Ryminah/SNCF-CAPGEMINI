<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('db_projects', function (Blueprint $table) {
            $table->increments('id');            
            $table->integer('db_id')->unsigned();
            $table->timestamps();

            $table->foreign('db_id')->references('id')->on('data_bases')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('db_projects');
    }
};
