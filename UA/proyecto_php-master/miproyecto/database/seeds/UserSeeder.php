<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->delete();

        $user = new User();
        $user->name = "Stalyn";
        $user->password = "1234";
        $user->save();

        $user2 = new User();
        $user2->name = "David";
        $user2->password = "0000";
        $user2->save();

        $user2 = new User();
        $user2->name = "Joselyn";
        $user2->password = "0001";
        $user2->save();

        $user2 = new User();
        $user2->name = "Alejandro";
        $user2->password = "0002";
        $user2->save();

        $user1 = new User();
        $user1->name = "Coral";
        $user1->password = "4321";
        $user1->save();

        $user1 = new User();
        $user1->name = "Juanga";
        $user1->password = "4321";
        $user1->save();
    }
}
