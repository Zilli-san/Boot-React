import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { save } from "../../slices/loginSlice";
import type { AppDispatch } from "../../store";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams()

    const authCode = searchParams.get("code")

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const [error, setError] = useState('')

    useEffect(() => {

        if (!authCode) {
            return
        }

        getAccessToken(authCode)
            .then(accessToken => getMemberWithAccessToken(accessToken))
            .then(memberInfo => {

                console.log("-------------------")
                console.log(memberInfo)

                dispatch(save(memberInfo))

                if (memberInfo.social) {
                    navigate('/member/modify', { replace: true })
                } else {
                    navigate('/', { replace: true })
                }
            })
            .catch(err => {
                console.error(err)
                setError('카카오 로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.')
            })

    }, [authCode, dispatch, navigate])

    return (
        <div className="p-6 text-2xl">
            <div>Kakao Login Redirect</div>
            {error
                ? <div className="text-red-500">{error}</div>
                : <div>카카오 로그인 처리중...</div>}
        </div>
    )
}

export default KakaoRedirectPage;