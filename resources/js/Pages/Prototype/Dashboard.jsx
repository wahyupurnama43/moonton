import Authenticated from "@/Layouts/Authenticated/index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/inertia-react";
import FeaturedMovie from "@/Components/FeaturedMovie";
import BrowseMovie from "@/Components/BrowseMovie";

export default function dashboard() {
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
        <Authenticated>
            <Head>
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
                    {[1, 2, 3, 4].map((i) => (
                        <FeaturedMovie
                            key={i}
                            slug="the-batman"
                            name={`The batman ${i}`}
                            category="Comedy"
                            thumbnail="https://picsum.photos/id/1/300/300"
                            rating={i + 1}
                        />
                    ))}
                </Flickity>
            </div>

            <div className="mt-[50px]">
                <div className="font-semibold text-[22px] text-black mb-4">
                    Browse
                </div>
                <Flickity className="gap-[30px]" options={optionFlickty}>
                    {[1, 2, 3, 4].map((i) => (
                        <BrowseMovie
                            key={i}
                            slug="the-Cat"
                            name={`The Cat ${i}`}
                            category="Comedy"
                            thumbnail={`/assets/images/browse-${i}.png`}
                        />
                    ))}
                </Flickity>
            </div>
        </Authenticated>
    );
}
