import { useLoaderData } from "react-router";
import ReadComponent from "../../components/products/readComponent";

function ReadPage() {

    const product = useLoaderData() as ProductDTO

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Products Read Page
            </div>

            <ReadComponent product={product} />
        </div>
    )
}

export default ReadPage