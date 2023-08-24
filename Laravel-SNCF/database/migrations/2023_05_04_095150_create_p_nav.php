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
        Schema::create('p_nav', function (Blueprint $table) {
            $table->id('id,',true);
            $table->integer('id_objet')->nullable();
            $table->integer('id_pas')->nullable();
            $table->geometry('geom')->nullable();
            $table->spatialIndex(['geom'], 'p_nav_geom_idx');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('p_nav');
    }
};
