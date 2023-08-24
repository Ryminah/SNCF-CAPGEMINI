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
        Schema::create('voie', function (Blueprint $table) {
            $table->integer('id', true);
            $table->geometry('geom')->nullable();
            $table->string('id_objet', 254)->nullable();
            $table->string('id_sequence', 254)->nullable();
            $table->string('id_pas', 254)->nullable();
            $table->string('nom_voie', 254)->nullable();
            $table->string('imu', 254)->nullable();
            $table->string('imu_ligne', 254)->nullable();
            $table->string('type', 7)->nullable();
            $table->string('numero', 7)->nullable();
            $table->string('etat', 254)->nullable();

            $table->spatialIndex(['geom'], 'voie_geom_idx');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('voie');
    }
};
