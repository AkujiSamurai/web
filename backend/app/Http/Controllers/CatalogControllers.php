<?php

namespace App\Http\Controllers;

use App\Models\Product;

class CatalogControllers extends Controller
{
    public function index()
    {
        return Product::query()->get();
    }

    public function info($id)
    {
        return Product::query()->where("id", $id)->first();
    }
}
