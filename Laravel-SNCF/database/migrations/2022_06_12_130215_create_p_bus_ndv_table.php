<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePBusNdvTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_bus_ndv', function (Blueprint $table) {
            $table->integer('id', true);
            $table->geometry('geom')->nullable();
            $table->bigInteger('fid')->nullable();
            $table->float('id_objet', 0, 0)->nullable();
            $table->string('imu', 500)->nullable();
            $table->string('type', 7)->nullable();
            $table->string('pk_min_spk', 10)->nullable();
            $table->string('pk_max_spk', 10)->nullable();
            $table->float('id_pays', 0, 0)->nullable();
            $table->string('nom', 80)->nullable();
            $table->string('nom1', 80)->nullable();
            $table->string('nom2', 80)->nullable();
            $table->float('numero', 0, 0)->nullable();
            $table->string('nom_ze_lze', 10)->nullable();
            $table->string('etat', 3)->nullable();
            $table->float('id_pas', 0, 0)->nullable();
            $table->timestamp('date_heure_maj')->nullable();
            $table->float('id_voie1', 0, 0)->nullable();
            $table->float('id_voie2', 0, 0)->nullable();
            $table->string('pk_doc_appl', 10)->nullable();
            $table->string('nom_schema', 250)->nullable();

            $table->spatialIndex(['geom'], 'sidx_p_bus_ndv_geom');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('p_bus_ndv');
    }
}
