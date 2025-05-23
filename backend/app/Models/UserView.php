<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserView extends Model
{
    protected $table = "users_views";
    protected $fillable = [
        'id_product',
        'id_user'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
}
