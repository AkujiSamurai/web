<?php

namespace App\Http\Controllers;

class CatalogControllers extends Controller
{
    public function index()
    {
        return [
            ["id" => 1, "name" => "Samsung"],
            ["id" => 2, "name" => "Iphone"],
            ["id" => 3, "name" => "Oppo"],
            ["id" => 4, "name" => "Xiaomi"],
            ["id" => 5, "name" => "LG"]
        ];
    }

    public function info($id)
    {
        return ["id" => $id, "name" => "Samsung"];
    }
}
