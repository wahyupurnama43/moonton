<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */

    private function activePlan()
    {
        $activePlan = Auth::user() ? Auth::user()->LastActiveUserSubs : null;

        if (!$activePlan) {
            return null;
        }

        $lastDay           = Carbon::parse($activePlan->update_at)->addMonths($activePlan->subscriptionPlan->active_period_in_months);
        $activeDays        = Carbon::parse($activePlan->updated_at)->diffInDays($lastDay);
        $remaingActiveDays = Carbon::parse($activePlan->expired_date)->diffInDays(Carbon::now());

        return [
            'name'                => $activePlan->subscriptionPlan->name,
            'remainingActiveDays' => $remaingActiveDays,
            'activeDays'          => $activeDays
        ];
    }

    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user'       => $request->user(),
                'activePlan' => $this->activePlan(),
            ],
            'flashMessage' => [
                'message' => Session::get('message'),
                'type'    => Session::get('type'),
            ],
            'env' => [
                'MIDTRANS_CLIENT' => env('MIDTRANS_CLIENT')
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
