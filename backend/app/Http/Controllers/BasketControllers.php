<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use Illuminate\Http\Request;

class BasketControllers extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'id_user' => 'required|integer'
        ]);

        return Basket::with('product')
            ->where("id_user", $request->id_user)
            ->get();
    }

    public function create(Request $request)
    {
        $fields = $request->validate([
            'id_product' => 'required|integer',
            'id_user' => 'required|integer'
        ]);
        $basketItem = Basket::create($fields);

        return response()->json([
            'message' => 'Товар успешно добавлен в корзину',
            'item' => $basketItem,
        ], 201);
    }

    public function increaseCount(Request $request)
    {
        $request->validate([
            'id_product' => 'required|integer',
            'id_user' => 'required|integer'
        ]);

        $basketItem = Basket::query()->where("id_user", $request->id_user)
            ->where("id_product", $request->id_product)
            ->first();

        $basketItem->count += 1;

        $basketItem->save();

        return response()->json([
            'message' => 'Количество товара успешно обновлено',
            'item' => $basketItem,
        ], 200);
    }

    public function decreaseCount(Request $request)
    {
        $request->validate([
            'id_product' => 'required|integer',
            'id_user' => 'required|integer'
        ]);

        $basketItem = Basket::query()->where("id_user", $request->id_user)
            ->where("id_product", $request->id_product)
            ->first();

        $basketItem->count -= 1;

        $basketItem->save();

        return response()->json([
            'message' => 'Количество товара успешно обновлено',
            'item' => $basketItem,
        ], 200);
    }

    public function delete($id)
    {
        $basketItem = Basket::query()->where("id", $id)
            ->first();

        $basketItem->delete();

        return response()->json([
            'message' => 'Товар успешно удален из корзины'
        ], 200);
    }
}
