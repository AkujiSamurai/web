<?php

namespace App\Services;

use App\Models\UserView;
use App\Models\Product;
use Phpml\Math\Distance\Euclidean;

class AIPhoneRecommender
{
    private Euclidean $distanceMetric;

    public function __construct()
    {
        $this->distanceMetric = new Euclidean();
    }

    public function getRecommendations(int $userId, int $perPhone = 2, int $totalLimit = 16)
    {
        $viewedProduct = UserView::with('product')
            ->where('id_user', $userId)
            ->latest()
            ->get()
            ->pluck('product')
            ->filter();

        if ($viewedProduct->isEmpty())
        {
            return collect();
        }

        $excludeIds = $viewedProduct->pluck('id')->toArray();
        $allProducts = Product::query()->whereNotIn('id', $excludeIds)->get();

        if ($allProducts->isEmpty())
        {
            return collect();
        }

        $allProductsForNormalization = $allProducts->merge($viewedProduct);
        $normalizedData = $this->calculateNormalizationFactors($allProductsForNormalization);

        $recommendation = collect();
        foreach ($viewedProduct as $product)
        {
            $similarProducts = $this->findSimilarProduct($product->id, $normalizedData, $allProducts, $perPhone);
            $recommendation = $recommendation->merge($similarProducts);
        }

        return $recommendation
            ->unique('id')
            ->take($totalLimit);
    }

    private function calculateNormalizationFactors($products): array
    {
        $maxRam = $products->max('ram_gb');
        $maxStorage = $products->max('storage_gb');
        $maxPrice = $products->max('price');

        $normalized = [];
        foreach ($products as $product)
        {
            $normalized[$product->id] = [
                $product->ram_gb / $maxRam,
                $product->storage_gb / $maxStorage,
                $product->price / $maxPrice,
            ];
        }
        return $normalized;
    }

    private function findSimilarProduct($targetId, $normalizedData, $allProducts, $limit)
    {
        if (!isset($normalizedData[$targetId]))
        {
            return collect();
        }

        $targetFeatures = $normalizedData[$targetId];
        $productWithDistance = [];

        foreach ($normalizedData as $id => $features)
        {
            if ($id == $targetId || !$allProducts->contains('id', $id))
            {
                continue;
            }


            $distance = $this->distanceMetric->distance($targetFeatures, $features);
            $productWithDistance[$id] = $distance;
        }

        asort($productWithDistance);
        $topIds = array_slice(array_keys($productWithDistance), 0, $limit, true);

        return $allProducts->whereIn('id', $topIds);
    }
}
