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
        Schema::create('producteur', function (Blueprint $table) {
            $table->id('id',true);
            $table->string('nom', 25)->nullable();
            $table->string('mail', 30)->nullable();
            $table->string('imu', 500)->nullable();
            $table->timestamp('dt_suppr')->nullable();
            $table->string('role', 3)->nullable();
            $table->string('login_w', 25)->nullable();
            $table->string('actif', 1)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('producteur');
    }
};
