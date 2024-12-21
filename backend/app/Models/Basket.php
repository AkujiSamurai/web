<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Basket extends Model
{
    protected $table = "basket";
    protected $fillable = [
        'id_product',
        'id_user',
        'count'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
}
