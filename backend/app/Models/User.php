<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }
}
