<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BaseController extends Controller
{
    public function success($result,$message,$code = 200)
    {
        $response = [
            "code" => $code,
            "success" => true,
            "data" => $result,
            "message" => $message,
        ]; 

        return response()->json($response,$code);
    }

    public function error($error,$errMsg,$code = 500)
    {
        $response = [
            "code" => $code,
            "success" => false,
            "message" => $error,
        ];

            if(!empty($errMsg)){
                $response["data"] = $errMsg;
            }

            return response()->json($response,$code);
    }
}
