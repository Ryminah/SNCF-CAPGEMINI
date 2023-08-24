@echo off



REM Démarrage du serveur Angular
cd Angular-SNCF
start npm run start

REM Démarrage du serveur Laravel
cd ../Laravel-SNCF
start php artisan serve
