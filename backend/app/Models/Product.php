<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $fillable = [
        'img',
        'title',
        'model',
        'price',
        'description',
        'ram_gb',
        'storage_gb'
    ];
}
