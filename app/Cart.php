<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'add_to_cart_products';

    protected $fillable = [
        'id',
        'cartItems'
    ];

    protected $casts = [
        'cartItems' => 'array'
    ];


}
