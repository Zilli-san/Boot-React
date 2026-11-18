import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, Navigate, useNavigate } from "react-router"
import type { AppDispatch, RootState } from "../store"
import { loginPostAsync, logout } from "../slices/loginSlice"

const useCustomLogin = () => {

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const loginState = useSelector((state: RootState) => state.loginSlice)

    const loginStatus = loginState.status

    const isLogin = loginState.email ? true : false

    const doLogin = async (email: string, pw: string) => {
        dispatch(loginPostAsync({ email, pw }))
    }

    const doLogout = () => {
        dispatch(logout())
    }

    const moveToLogin = () => {
        navigate("/member/login")
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login" />
    }

    const moveToPath = (path: string) => {
        navigate({ pathname: path }, { replace: true })
    }

    const exceptionHandle = (ex: unknown) => {

        console.log("Exception------------------------")
        console.log(ex)

        const err = ex as { message?: string, response?: { data?: { error?: string } } }

        const errorMsg = err.response?.data?.error ?? err.message ?? 'ERROR'

        const errorStr = createSearchParams({ error: errorMsg }).toString()

        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인 해야만 합니다.")
            doLogout()
            navigate({ pathname: '/member/login', search: errorStr })
            return
        }

        if (errorMsg === 'ERROR_ACCESSDENIED') {
            alert("해당 메뉴를 사용할수 있는 권한이 없습니다.")
            navigate({ pathname: '/member/login', search: errorStr })
            return
        }
    }

    return { loginState, loginStatus, isLogin, doLogin, doLogout, moveToLogin, moveToLoginReturn, moveToPath, exceptionHandle }
}

export default useCustomLogin