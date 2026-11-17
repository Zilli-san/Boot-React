import axios from "axios"
import { createSearchParams } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import { API_SERVER_HOST } from "./todoApi"

const prefix = `${API_SERVER_HOST}/api/products`

export async function loadProducts({ request }: LoaderFunctionArgs): Promise<PageResponseDTO<ProductDTO>> {

    const url = new URL(request.url)
    const page = url.searchParams.get('page') || "1"
    const size = url.searchParams.get('size') || "10"

    const queryStr = createSearchParams({ page, size }).toString()

    const res = await axios.get(`${prefix}/list?${queryStr}`)

    return res.data
}

export async function loadProduct({ params }: LoaderFunctionArgs): Promise<ProductDTO> {

    const { pno } = params

    const res = await axios.get(`${prefix}/${pno}`)

    return res.data
}