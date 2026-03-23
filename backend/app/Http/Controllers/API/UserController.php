<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\User\UserListResource;
use App\Repositories\User\UserRepositoryInterface;
use Spatie\Permission\Models\Permission;

class UserController extends BaseController
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function index()
    {
        $user = $this->userRepo->index();

        return $this->success($user, 'user retrived successfully', 200);
    }

    public function find($id)
    {
        $user = $this->userRepo->find($id);

        $payload = new UserListResource($user);

        return $this->success($payload, 'User retrived successfully', 200);
        }


    public function update($userId)
    {
        
    }


    public function addPermission()
    {
        $user = $this->userRepo->find(1);
        // dd($user);
        // $permission = Permission::find(5);
        $user->givePermissionTo('createTeacher');

        return $this->success($user, 'asdasd', 200);
    }

    

    public function destroy($id)
    {

    /** @var \App\Models\User $targetUser */
        $targetUser = $this->userRepo->find($id);

        $this->authorize("delete",$targetUser);

        $user = $this->userRepo->destroy($id);

        return $this->success($user, 'User Deleted Successfully', 204);
    }


}
