<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

         // Create Roles (using firstOrCreate to prevent duplicates on re-run)

        $admins = Role::create(['name' => 'admin',"guard_name" => "api"]);
        $student = Role::create(['name' => 'student',"guard_name" => "api"]);
        $teacher = Role::create(['name' => 'teacher', "guard_name" => "api"]);

        $showAttendances = Permission::create(['name' => 'showAttendances',"guard_name" => "api"]);
        $createAttendances = Permission::create(['name' => 'createAttendances',"guard_name" => "api"]);
        $editAttendances = Permission::create(['name' => 'updateAttendances',"guard_name" => "api"]);
        $deleteAttendances = Permission::create(['name' => 'deleteAttendances',"guard_name" => "api"]);
        $createTeacher = Permission::create(['name' => 'createTeacher',"guard_name" => "api"]);
        $showTeacher = Permission::create(['name' => 'showTeacher',"guard_name" => "api"]);
        $editTeacher = Permission::create(['name' => 'updateTeacher',"guard_name" => "api"]);
        $deleteTeacher = Permission::create(['name' => 'deleteTeacher',"guard_name" => "api"]);

        $assignTeacherSubject = Permission::create(['name' => 'assignTeacherSubject',"guard_name" => "api"]);

        $admin = Role::find(1);

        $admin->givePermissionTo([
            $showTeacher,
            $editTeacher,
            $createTeacher,
            $deleteTeacher,
            $assignTeacherSubject,
        ]);

    }
}
