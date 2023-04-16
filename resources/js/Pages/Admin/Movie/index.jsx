import Autenticated from "@/Layouts/Authenticated/index";
import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMessage";
import { Link } from "@inertiajs/inertia-react";

export default function Index({ auth, flashMessage }) {
    return (
        <>
            <Autenticated auth={auth}>
                <Link href={route("admin.dashboard.movie.create")}>
                    <Button type="button" className="w-40 mb-8">
                        Insert New Movie
                    </Button>
                </Link>

                {flashMessage?.message && (
                    <FlashMessage message={flashMessage.message} />
                )}
            </Autenticated>
        </>
    );
}
