<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movies = [
            [
                'name'        => 'wahyu purnama',
                'slug'        => 'wahyu-purnama',
                'category'    => 'Drama',
                'video_url'   => 'https://www.youtube.com/watch?v=SIu6QunbEtM',
                'thumbnail'   => 'https://plus.unsplash.com/premium_photo-1670270312555-ee722a1bbc4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80',
                'rating'      => 5.4,
                'is_featured' => true
            ],
            [
                'name'        => 'wahyu purnama2',
                'slug'        => 'wahyu-purnama2',
                'category'    => 'Drama',
                'video_url'   => 'https://www.youtube.com/watch?v=SIu6QunbEtM',
                'thumbnail'   => 'https://plus.unsplash.com/premium_photo-1670270312555-ee722a1bbc4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80',
                'rating'      => 9.4,
                'is_featured' => true
            ]
        ];

        Movie::insert($movies);
    }
}
