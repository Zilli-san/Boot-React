import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const rest_api_key = `PUT_YOUR_REST_API_KEY_HERE`

const client_secret = ``

const redirect_uri = `http://localhost:5173/member/kakao`

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL
}

export const getAccessToken = async (authCode: string) => {

    const params = new URLSearchParams()
    params.append("grant_type", "authorization_code")
    params.append("client_id", rest_api_key)
    params.append("redirect_uri", redirect_uri)
    params.append("code", authCode)

    if (client_secret) {
        params.append("client_secret", client_secret)
    }

    const res = await axios.post(access_token_url, params)

    return res.data.access_token as string
}

export const getMemberWithAccessToken = async (accessToken: string) => {

    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, { params: { accessToken } })

    return res.data
}