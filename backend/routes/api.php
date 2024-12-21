<?php

use App\Http\Controllers\CatalogControllers;
use App\Http\Controllers\UserControllers;
use App\Http\Controllers\BasketControllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('home', [CatalogControllers::class, 'index']);
Route::get('product/{id}', [CatalogControllers::class, 'info']);

Route::post('create', [BasketControllers::class, 'create']);
Route::get('basket', [BasketControllers::class, 'index']);
Route::put('increaseCount', [BasketControllers::class, 'increaseCount']);
Route::put('decreaseCount', [BasketControllers::class, 'decreaseCount']);
Route::delete('delete/{id}', [BasketControllers::class, 'delete']);

Route::post('register', [UserControllers::class, 'register']);
Route::post('login', [UserControllers::class, 'login']);

