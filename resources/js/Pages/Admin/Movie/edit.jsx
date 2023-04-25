import Autenticated from "@/Layouts/Authenticated";

import { Head, useForm } from "@inertiajs/inertia-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <>
            <Autenticated auth={auth}>
                <Head title="Admin - Update Movie" />
                <h1 className="text-xl">Update movie : {movie.name}</h1>
                <hr className="mb-4 mt-3" />

                <form className="w-100" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <div>
                            <InputLabel
                                forInput="name"
                                chil="Name"
                                value="Name"
                            />
                            <TextInput
                                type="text"
                                placeholder="Enter Name of the movie"
                                id="name"
                                name="name"
                                variant="primary-outline"
                                handleChange={onHandleChange}
                                defaultValue={movie.name}
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                forInput="category"
                                chil="category"
                                value="Category"
                            />
                            <TextInput
                                type="text"
                                placeholder="category"
                                id="category"
                                variant="primary-outline"
                                name="category"
                                handleChange={onHandleChange}
                                defaultValue={movie.category}
                            />

                            <InputError
                                message={errors.category}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                forInput="video_url"
                                chil="video_url"
                                value="video url"
                            />
                            <TextInput
                                type="url"
                                placeholder="video url"
                                id="video_url"
                                variant="primary-outline"
                                name="video_url"
                                handleChange={onHandleChange}
                                defaultValue={movie.video_url}
                            />

                            <InputError
                                message={errors.video_url}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                forInput="thumbnail"
                                chil="thumbnail"
                                value="video url"
                            />

                            <img
                                src={`/storage/${movie.thumbnail}`}
                                alt=""
                                width={200}
                                className="my-5"
                            />

                            <TextInput
                                type="file"
                                placeholder="thumbnail"
                                id="thumbnail"
                                variant="primary-outline"
                                name="thumbnail"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.thumbnail}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                forInput="rating"
                                chil="rating"
                                value="rating"
                            />
                            <TextInput
                                type="number"
                                placeholder="rating"
                                id="rating"
                                variant="primary-outline"
                                name="rating"
                                handleChange={onHandleChange}
                                defaultValue={movie.rating}
                            />

                            <InputError
                                message={errors.rating}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-row mt-4 items-center">
                            <InputLabel
                                forInput="is_featured"
                                chil="is_featured"
                                value="is featured"
                                className="mr-4 mt-1"
                            />
                            <Checkbox
                                checked={movie.is_featured}
                                name="is_featured"
                                handleChange={(e) =>
                                    setData("is_featured", e.target.checked)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid space-y-[14px] mt-[30px]">
                        <Button
                            type="submit"
                            variant="primary"
                            processing={processing}
                        >
                            <span className="text-base font-semibold">
                                Save
                            </span>
                        </Button>
                    </div>
                </form>
            </Autenticated>
        </>
    );
}
