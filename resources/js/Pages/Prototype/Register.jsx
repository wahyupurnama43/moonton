import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Register() {
    return (
        <>
            <Head title="Sign Up" />
            <div class="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div class="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/assets/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div class="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <img src="/assets/images/moonton-white.svg" alt="" />
                        <div class="my-[70px]">
                            <div class="font-semibold text-[26px] mb-3">
                                Sign Up
                            </div>
                            <p class="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                        </div>
                        <form class="w-[370px]">
                            <div class="flex flex-col gap-6">
                                <div>
                                    <InputLabel
                                        value="Full Name"
                                        forInput="fullname"
                                    />

                                    <TextInput
                                        type="text"
                                        name="fullname"
                                        placeholder="Your fullname..."
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        value="Email Address"
                                        forInput="email"
                                    />

                                    <TextInput
                                        type="email"
                                        name="email"
                                        placeholder="Your Email Address"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        value="Password"
                                        forInput="password"
                                    />

                                    <TextInput
                                        type="password"
                                        name="password"
                                        placeholder="Your Password"
                                    />
                                </div>
                            </div>
                            <div class="grid space-y-[14px] mt-[30px]">
                                <Button type="button" variant="primary">
                                    <span class="text-base font-semibold">
                                        Sign Up
                                    </span>
                                </Button>
                                <Link href={route("prototype.login")}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
                                    >
                                        <span class="text-base text-white">
                                            Sign In to My Account
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
