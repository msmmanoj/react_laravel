<?php

namespace App\Http\Controllers;

use App\Cart;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getProducts()
    {
        $response = Product::with('category')->get();
        return response()->json($response);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function insert(Request $request)
    {
        $errors = [];
        foreach ($request->get('products') as $data) {
            $validator = Validator::make($data, [
                'name' => ['required'],
                'cat_id' => ['required', 'exists:product_category,id'],
                'price' => ['required', 'numeric'],
            ]);
            if ($validator->fails()) {
                foreach ($validator->errors()->all() as $error) {
                    $errors[] = $error;
                }
            } else {
                $product = new Product();
                $product->fill($data);
                $product->save();
            }

        }
        if (!empty($errors)) {
            return response()->json(['errors' => $errors])->setStatusCode(422);
        }
        return response()->json(array('status' => true, 'message' => 'Products stored successfully.'))->setStatusCode(201);
    }

    public function addToCart(Request $request) {
        try {
            $cart = Cart::firstOrNew(['id' => 1]);
            $cart->cartItems = $request->all();
            $cart->save();
            return response()->json(array('status' => true, 'message' => 'Cart Items stored successfully.'))->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json(['status' => false])->setStatusCode(422);
        }
    }

    public function getCart() {
        $response = Cart::select('cartItems')->get();;
        return response()->json($response);
    }
}
