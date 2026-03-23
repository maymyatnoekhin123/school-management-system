<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\User\RegisterRequest;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class AuthController extends BaseController
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function login(Request $request)
    {
        $userExists = \App\Models\User::where('email', $request->email)->first();
    if (!$userExists) {
        return $this->error('User not found in database', null, 404);
    }
        try {
            $credentials = $request->only(['email', 'password']);
            if (! $token = JWTAuth::attempt($credentials)) {
                return $this->error('Your Email and Password is wrong', null, 401);
            }
            
            
            $user = JWTAuth::user();
            $user->load("roles.permissions");

            $payload = [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "is_active" => $user->is_active,
                "roles" => $user->getRoleNames(),
                "permissions" => $user->getAllPermissions()->pluck("name"),
            ];

            return $this->success([
                "token" => $token,
                "user" => $payload],"User logged in successfully",200);
            
        } catch (Exception $e) {
            return $this->error('Server Error', $e->getMessage(), 500);
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $validatedUser = $request->validated();

            $validatedUser["password"] = Hash::make($validatedUser['password']);

            $data = $this->userRepo->register($validatedUser);

            return $this->success($data, 'Register Successfully', 200);
        } catch (Exception $e) {
            return $this->error($e->getMessage() ? $e->getMessage() : 'Something went wrong!', null, 500);
        }

    }

    public function verify(Request $request)
    {
        $user = auth()->user();

        if (!$user){
            return $this->error("Unauthorized",null,401);
        }

        $payload = [
        "id" => $user->id,
        "name" => $user->name,
        "email" => $user->email,
        "roles" => $user->getRoleNames(),
        "permissions" => $user->getAllPermissions()->pluck("name"),
    ];
        return $this->success($payload,"verify successfully",200);
    }

    public function logout()
    {
        auth()->logout();

        return $this->success(null,"Successfully Logout",200);
    }
}
