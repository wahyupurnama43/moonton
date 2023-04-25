import Authenticated from "@/Layouts/Authenticated/index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/inertia-react";
import FeaturedMovie from "@/Components/FeaturedMovie";
import BrowseMovie from "@/Components/BrowseMovie";

export default function dashboard({ auth, featureMovies, movies }) {
    const optionFlickty = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Dashboard">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>
            <div>
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <Flickity className="gap-[30px]" options={optionFlickty}>
                    {/* Movie Thumbnail */}
                    {featureMovies.map((featureMovies) => (
                        <FeaturedMovie
                            key={featureMovies.id}
                            slug={featureMovies.slug}
                            name={featureMovies.name}
                            category={featureMovies.kategory}
                            thumbnail={featureMovies.thumbnail}
                            rating={featureMovies.rating}
                        />
                    ))}
                </Flickity>
            </div>

            <div className="mt-[50px]">
                <div className="font-semibold text-[22px] text-black mb-4">
                    Browse
                </div>
                <Flickity className="gap-[30px]" options={optionFlickty}>
                    {movies.map((movies) => (
                        <BrowseMovie
                            key={movies.id}
                            slug={movies.slug}
                            name={movies.name}
                            category={movies.category}
                            thumbnail={movies.thumbnail}
                        />
                    ))}
                </Flickity>
            </div>
        </Authenticated>
    );
}
