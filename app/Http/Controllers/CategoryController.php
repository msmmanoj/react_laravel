<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function getCategory()
    {
        $response = Category::get();
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
        foreach ($request->get('category') as $data) {
            $validator = Validator::make($data, [
                'name' => ['required'],
            ]);
            if ($validator->fails()) {
                foreach ($validator->errors()->all() as $error) {
                    $errors[] = $error;
                }
            } else {
                $category = new Category();
                $category->name = $data['name'];
                $category->save();
            }

        }
        if (!empty($errors)) {
            return response()->json(['errors' => $errors])->setStatusCode(422);
        }
        return response()->json(array('status' => true, 'message' => 'Category stored successfully.'))->setStatusCode(201);
    }
}
