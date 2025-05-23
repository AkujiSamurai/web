<?php

namespace App\Http\Controllers;

use App\Services\AIPhoneRecommender;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function __construct(
        private AIPhoneRecommender $recommender
    ){}

    public function index(Request $request)
    {
        $request->validate([
            'id_user' => 'required|integer'
        ]);

        $recommendations = $this->recommender->getRecommendations($request->id_user);

        return response()->json([
            'success' => true,
            'data' => $recommendations
        ], 200);
    }
}
