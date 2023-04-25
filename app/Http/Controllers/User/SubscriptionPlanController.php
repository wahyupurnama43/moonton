<?php

namespace App\Http\Controllers\User;

use Midtrans;
use Carbon\Carbon;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SubscriptionPlanController extends Controller
{

    public function __construct()
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = env('MIDTRANS_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction =  env('MIDTRANS_IS_PRODUCTION');;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized =  env('MIDTRANS_IS_SANITIZED');;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds =  env('MIDTRANS_IS_3DS');;
    }

    public function index()
    {
        $subcriptionPlans = SubscriptionPlan::all();
        return inertia('User/Dashboard/SubcriptionPlan/index', [
            'plans' => $subcriptionPlans,
            'userSubscription' => null,
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
            'payment_status'       => 'pending',
        ];

        $create = UserSubscription::create($data);

        $params = [
            'transaction_details' => array(
                'order_id'     => $create->id . '-' . Str::random(5),
                'gross_amount' => $create->price,
            )
        ];


        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $create->update([
            'snap_token' => $snapToken
        ]);


        return inertia('User/Dashboard/SubcriptionPlan/index', [
            'userSubscription' => $create
        ]);
    }

    public function midtransCallback(Request $request)
    {
        $notif = new Midtrans\Notification();

        $transaction_status = $notif->transaction_status;
        $fraud              = $notif->fraud_status;

        $transaction_id   = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubscription::where('id', $transaction_id)->first();

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = 'pending';
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSubscription->payment_status = 'paid';
                $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
            }
        } else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
        } else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failed';
        } else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = 'paid';
            $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
        } else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = 'pending';
        } else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = 'failed';
        }

        $userSubscription->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success'
        ]);
    }
}
