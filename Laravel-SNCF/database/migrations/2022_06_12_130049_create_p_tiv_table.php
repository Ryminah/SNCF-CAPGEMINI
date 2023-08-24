<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePTivTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_tiv', function (Blueprint $table) {
            $table->integer('id', true);
            $table->geometry('geom')->nullable();
            $table->bigInteger('fid')->nullable();
            $table->float('id_objet', 0, 0)->nullable();
            $table->string('nom_voie', 100)->nullable();
            $table->string('imu_voie', 500)->nullable();
            $table->float('id_voie', 0, 0)->nullable();
            $table->string('imu', 500)->nullable();
            $table->string('type', 7)->nullable();
            $table->string('sens_principal', 10)->nullable();
            $table->string('etat', 3)->nullable();
            $table->float('id_pas', 0, 0)->nullable();
            $table->timestamp('date_heure_maj')->nullable();
            $table->float('id_ndv1', 0, 0)->nullable();
            $table->float('id_ndv2', 0, 0)->nullable();
            $table->float('id_branche_ndv1', 0, 0)->nullable();
            $table->float('id_branche_ndv2', 0, 0)->nullable();
            $table->string('nom_schema', 250)->nullable();

            $table->spatialIndex(['geom'], 'sidx_p_tiv_geom');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('p_tiv');
    }
}
