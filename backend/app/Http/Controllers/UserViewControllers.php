<?php

namespace App\Http\Controllers;

use App\Models\UserView;
use Illuminate\Http\Request;

class UserViewControllers extends Controller 
{
    public function index(Request $request)
    {
        $request->validate([
            'id_user' => 'required|integer'
        ]);

        return UserView::with('product')
            ->where("id_user", $request->id_user)
            ->get();
    }

    public function create(Request $request)
    {
        $fields = $request->validate([
            'id_product' => 'required|integer',
            'id_user' => 'required|integer'
        ]);
        $UserViewItem = UserView::create($fields);

        return response()->json([
            'message' => 'Данные сохранены',
            'item' => $UserViewItem,
        ], 201);
    }
}