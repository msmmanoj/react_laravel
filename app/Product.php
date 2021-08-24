<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name',
        'price',
        'cat_id'
    ];

    public function category()
    {
        return $this->hasMany(Category::class, 'id','cat_id');
    }

}
