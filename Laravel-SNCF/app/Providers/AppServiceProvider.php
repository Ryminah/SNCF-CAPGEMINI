<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// poir gerer notre connection avec la BD
use Illuminate\Support\facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */

     // LA FONCTION boot de démarage
    public function boot()
    {
        //la longueur de la chaine de caractere pour migration
        Schema::defaultStringLength(191);

    }
}
