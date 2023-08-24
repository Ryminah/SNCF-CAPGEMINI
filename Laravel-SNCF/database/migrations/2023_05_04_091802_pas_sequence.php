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
        Schema::create('pas_sequence', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('id_pas')->nullable();
            $table->timestamp('debut')->nullable();
            $table->timestamp('fin')->nullable();
            $table->integer('id_sequence')->nullable();
            $table->string('type_chaine', 4)->nullable();
            $table->string('statut_sequence', 5)->nullable();
            $table->integer('sp')->nullable();
            $table->string('nom_sequence', 50)->nullable();
            $table->integer('id_acces')->nullable();
            $table->string('login', 25)->nullable();
            $table->integer('id_pli')->nullable();
            $table->string('code_pli', 50)->nullable();
            $table->string('desc_pli', 70)->nullable();
            $table->integer('id_schema')->nullable();
            $table->string('nom_schema', 30)->nullable();
            $table->integer('numero_zone')->nullable();
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
    }
};
