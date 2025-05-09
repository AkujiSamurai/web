<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = "users";
    protected $fillable = [
        'login',
        'password'
    ];
    protected $visible = [
        'id', 
        'login', 
        'created_at', 
        'updated_at'
    ];
}
