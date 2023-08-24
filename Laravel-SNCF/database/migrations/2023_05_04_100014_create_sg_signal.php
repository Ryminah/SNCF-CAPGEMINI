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
        Schema::create('sg_signal', function (Blueprint $table) {
            $table->id('id', true);
            $table->integer('id_objet')->nullable();
            $table->string('imu', 36)->nullable();
            $table->string('nom', 16)->nullable();
            $table->string('pk_doc_app', 9)->nullable();
            $table->string('etat', 3)->nullable();
            $table->integer('id_pas')->nullable();
            $table->string('date_heure', 19)->nullable();
            $table->string('nom_schema', 17)->nullable();
            $table->string('sens', 1)->nullable();
            $table->string('position', 1)->nullable();
            $table->string('indication',6)->nullable();
            $table->string('type', 1)->nullable();
            $table->string('equipe', 1)->nullable();
            $table->string('objet_refe', 1)->nullable();
            $table->integer('nom_table_')->nullable();
            $table->integer('id_objet_r')->nullable();
            $table->geometry('geom')->nullable();
            $table->spatialIndex(['geom'], 'sg_signal_geom_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sg_signal');
    }
};
