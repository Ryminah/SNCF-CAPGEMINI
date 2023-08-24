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
        Schema::create('bal_kvb', function (Blueprint $table) {
            $table->integer('id', true);
            $table->geometry('geom')->nullable();
            $table->string('imu', 35)->nullable();
            $table->string('nom', 11)->nullable();
            $table->integer('pk_doc_app')->nullable();
            $table->string('etat',3)->nullable();
            $table->string('date_heure', 20)->nullable();
            $table->string('nom_schema', 20)->nullable();
            $table->string('type', 10)->nullable();
            $table->string('nom_groupe', 10)->nullable();
            $table->string('ordre', 1)->nullable();
            $table->spatialIndex(['geom'], 'bal_kvb_geom_idx');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bal_kvb');
    }
};
