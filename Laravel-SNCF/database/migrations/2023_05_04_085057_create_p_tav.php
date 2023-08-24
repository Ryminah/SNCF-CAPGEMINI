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
        Schema::create('p_tav', function (Blueprint $table) {
            $table->integer('id', true);
            $table->geometry('geom', true)->nullable();
            $table->bigInteger('id_objet')->nullable();
            $table->bigInteger('id_pas')->nullable();
            $table->spatialIndex(['geom'], 'p_tav_geom_idx')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('p_tav');
    }
};
