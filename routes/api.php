<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::post('/todos/login','API\Auth\LoginController@login');
Route::post('/todos/logout','API\Auth\LoginController@logout');
Route::post('/todos/refresh','API\Auth\LoginController@refresh');
Route::post('/todos/me','API\Auth\LoginController@me');


Route::resource('todos', 'API\TodoController');
