<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserControllers extends Controller
{
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

        if (Auth::attempt($fields))
        {
            $user = Auth::user();

            return response()->json([
                'message' => 'Успешный вход',
                'item' => $user,
            ], 200);
        }

        return response()->json([
            'message' => 'Неверные учетные данные',
        ], 401);
    }
}
