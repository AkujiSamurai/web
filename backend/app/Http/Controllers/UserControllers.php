<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserControllers extends Controller
{
    public function info()
    {
        $user = $user = JWTAuth::parseToken()->authenticate();

        return response()->json($user);
    }
    
    public function register(Request $request)
    {
        $fields = $request->validate([
            'login' => 'required|string|unique:users,login',
            'password' => 'required|string',
        ]);

        $fields['password'] = bcrypt($fields['password']);

        $user = User::create($fields);

        return response()->json([
            'message' => 'Пользователь успешно зарегистрирован',
            'item' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
         $fields = $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['login', 'password']);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'message' => 'Неверные учетные данные',
            ], 401);
        }

        $user = JWTAuth::user();
        
         return response()->json([
            'message' => 'Успешный вход',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Успешный выход']);
    }
}
