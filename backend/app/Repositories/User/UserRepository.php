<?php

namespace App\Repositories\User;

use App\Models\Academic_Year;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function index()
    {
        return User::with('student', 'teacher', 'roles',"photo")->get();
    }

    public function find($id)
    {
        $user = User::with('roles', 'permissions',"photo")->findOrFail($id);

        if ($user->hasRole('student')) {
            $user->load('student');
        }

        if ($user->hasRole('teacher')) {
            $user->load('teacher');
        }

        return $user;
    }

    public function register($data)
    {
        return User::create($data);
    }

    public function update($data, $id)
    {
        // $user = User::find($id);
        $user = User::findOrFail($id);

        return $user->update($data);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        return $user->delete();
    }

    
}
