import { createSearchParams, redirect } from "react-router"
import type { LoaderFunctionArgs } from "react-router"
import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const prefix = `${API_SERVER_HOST}/api/products`

const toLogin = (ex: unknown) => {

    const err = ex as { message?: string, response?: { data?: { error?: string } } }

    const errorMsg = err.response?.data?.error ?? err.message ?? 'ERROR'

    return redirect(`/member/login?${createSearchParams({ error: errorMsg }).toString()}`)
}

export async function loadProducts({ request }: LoaderFunctionArgs): Promise<PageResponseDTO<ProductDTO>> {

    const url = new URL(request.url)
    const page = url.searchParams.get('page') || "1"
    const size = url.searchParams.get('size') || "10"

    const queryStr = createSearchParams({ page, size }).toString()

    try {
        const res = await jwtAxios.get(`${prefix}/list?${queryStr}`)
        return res.data
    } catch (e) {
        throw toLogin(e)
    }
}

export async function loadProduct({ params }: LoaderFunctionArgs): Promise<ProductDTO> {

    const { pno } = params

    try {
        const res = await jwtAxios.get(`${prefix}/${pno}`)
        return res.data
    } catch (e) {
        throw toLogin(e)
    }
}

export const getList = async (pageParam: PageParam) => {
    const res = await jwtAxios.get(`${prefix}/list`, { params: pageParam })
    return res.data
}