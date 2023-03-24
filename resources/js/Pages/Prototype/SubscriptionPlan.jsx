import Authenticated from "@/Layouts/Authenticated/index";
import SubscriptionCard from "@/Components/SubscriptionCard";

export default function SubscriptionPlan() {
    return (
        <>
            <Authenticated>
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
                        <SubscriptionCard
                            name="basic"
                            price={1234567}
                            durationInMonth={3}
                            feature={["Feature 1", "Feature 2", "Feature 3"]}
                        />
                        <SubscriptionCard
                            isPremium
                            name="Premium"
                            price={9999}
                            durationInMonth={3}
                            feature={["Premium 1", "Premium 2", "Premium 3"]}
                        />
                    </div>
                    {/* <!-- /Pricing Card --> */}
                </div>
                {/* <!-- END: Content --> */}
            </Authenticated>
        </>
    );
}
