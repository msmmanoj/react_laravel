<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('products', 'ProductController@getProducts');
Route::post('products', 'ProductController@insert');

Route::get('category', 'CategoryController@getCategory');
Route::post('category', 'CategoryController@insert');

Route::get('cartItems', 'ProductController@getCart');
Route::post('cartItems', 'ProductController@addToCart');
