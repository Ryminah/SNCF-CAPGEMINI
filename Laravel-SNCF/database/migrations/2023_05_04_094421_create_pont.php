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
        Schema::create('pont', function (Blueprint $table) {
            $table->id('id',true);
            $table->integer('id_objet')->nullable();
            $table->string('imu', 222)->nullable();

            $table->spatialIndex(['geom'], 'pont_geom_idx');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pont');
    }
};
