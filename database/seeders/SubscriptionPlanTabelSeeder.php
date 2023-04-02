<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionPlanTabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sub = [
            [
                'name' => 'Basic',
                'price' => 200000,
                'active_period_in_months' => 3,
                'features' => json_encode(['feature', 'feature2'])
            ], [
                'name' => 'Premium',
                'price' => 900000,
                'active_period_in_months' => 6,
                'features' => json_encode(['feature', 'feature2', 'feature3', 'feature4'])
            ]
        ];

        SubscriptionPlan::insert($sub);
    }
}
