<?php
use App\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});




Route::get('/mypage{name?}', function ($name='stalyn') {
    return view('/mypage', ['name'=>$name]);
});

Route::get('/app', function(){
    return view('layouts/app');
});

Route::get('/child', function(){
    return view('child');
});


Route::get('user', 'UserController@showList');
Route::get('user{id}', 'UserController@showProfile');


Route::get('user/registro', 'UserController@showForm');
Route::post('user/registro', 'UserController@postForm');