import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/Authenticated/index";
import SubscriptionCard from "@/Components/SubscriptionCard";
import { Head } from "@inertiajs/inertia-react";

export default function SubscriptionPlan({ auth, plans, env }) {
    const selectSubcription = (id) => {
        Inertia.post(
            route("user.dashboard.subscriptionPlan.subscribe", {
                subscriptionPlan: id,
            }),
            {},
            {
                only: ["userSubscription"],
                onSuccess: ({ props }) => {
                    snapMitrans(props.userSubscription);
                },
            }
        );
    };

    const snapMitrans = (UserSubscription) => {
        snap.pay(UserSubscription.snap_token, {
            // Optional
            onSuccess: function (result) {
                Inertia.visit(route("user.dashboard.index"));
            },
            // Optional
            onPending: function (result) {
                console.log(result);
            },
            // Optional
            onError: function (result) {
                console.log(result);
            },
        });
    };

    return (
        <>
            <Head title="Subscription Plant">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={env.MIDTRANS_CLIENT}
                ></script>
            </Head>
            <Authenticated auth={auth}>
                {/* <!-- START: Content --> */}
                <div className="py-20 flex flex-col items-center">
                    <div className="text-black font-semibold text-[26px] mb-3">
                        Pricing for Everyone
                    </div>
                    <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                        Invest your little money to get a whole new experiences
                        from movies.
                    </p>

                    {/* <!-- Pricing Card --> */}
                    <div className="flex justify-center gap-10 mt-[70px]">
                        {/* <!-- Basic --> */}
                        {plans.map((plans) => (
                            <SubscriptionCard
                                name={plans.name}
                                price={plans.price}
                                durationInMonth={plans.active_period_in_months}
                                feature={JSON.parse(plans.features)}
                                isPremium={plans.name == "Premium"}
                                key={plans.id}
                                onSelecSubscription={() =>
                                    selectSubcription(plans.id)
                                }
                            />
                        ))}
                    </div>
                    {/* <!-- /Pricing Card --> */}
                </div>
                {/* <!-- END: Content --> */}
            </Authenticated>
        </>
    );
}
