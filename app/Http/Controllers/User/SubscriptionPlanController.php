<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Http\Controllers\Controller;
use App\Models\UserSubscription;
use Illuminate\Support\Facades\Auth;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $subcriptionPlans = SubscriptionPlan::all();
        return inertia('User/Dashboard/SubcriptionPlan/index', [
            'plans' => $subcriptionPlans
        ]);
    }

    public function subscribe(Request $request, $id)
    {
        // ['user_id', 'subcription_plan_id', 'price', 'expired_date', 'payment_status', 'snapToken']
        $subcriptionPlan = SubscriptionPlan::where('id', $id)->firstOrFail();

        $data = [
            'user_id'              => Auth::id(),
            'subscription_plan_id' => $subcriptionPlan->id,
            'price'                => $subcriptionPlan->price,
            'expired_date'         => Carbon::now()->addMonths($subcriptionPlan->active_period_in_months),
            'payment_status'       => 'paid',
        ];

        $create = UserSubscription::create($data);

        return redirect()->route('user.dashboard.index');
    }
}
