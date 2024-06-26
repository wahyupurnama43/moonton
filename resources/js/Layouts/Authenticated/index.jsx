import Sidebar from "@/Layouts/Authenticated/Sidebar";
import Topbar from "@/Layouts/Authenticated/Topbar";
export default function Autenticated({ auth, children }) {
    return (
        <>
            <div className="mx-auto max-w-screen hidden lg:block">
                {/* START:Sidebar */}
                <Sidebar auth={auth} />
                {/* END:Sidebar */}

                {/* START:CONTENT */}
                <div className="ml-[300px] px-[50px]">
                    <div className="py-10 flex flex-col gap-[50px]">
                        {/* START:TOPBAR */}
                        <Topbar name={auth.user.name} />
                        {/* END:TOPBAR */}
                        <main>{children}</main>
                    </div>
                </div>
                {/* END:CONTENT */}
            </div>
            <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black">
                <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
                    Sorry, this page only supported on 1024px screen or above
                </div>
            </div>
        </>
    );
}
