<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
<<<<<<< HEAD

        $this->call(RoleTableSeeder::class);
        $this->call(userTableSeeder::class);
        $this->call(SubscriptionPlanTabelSeeder::class);
        // $this->call(MovieTableSeeder::class);
=======
>>>>>>> parent of fa88cd8 (feat : setup spatie)
    }
}
