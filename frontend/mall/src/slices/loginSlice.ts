import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil"

export interface LoginInfo {
    email: string
    nickname: string
    accessToken: string
    refreshToken: string
    roleNames: string[]
    status: string
}

const initState: LoginInfo = {
    email: '',
    nickname: '',
    accessToken: '',
    refreshToken: '',
    roleNames: [],
    status: ''
}

const loadMemberCookie = (): LoginInfo => {

    const member = getCookie("member")

    if (member && member.email) {
        return { ...member, status: '' }
    }

    return initState
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', ({ email, pw }: { email: string, pw: string }) => {

    console.log("---------------loginPostAsync---------------------")
    console.log(email, pw)

    return loginPost(email, pw)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie(),
    reducers: {
        save: (_state, action: PayloadAction<LoginInfo>) => {
            console.log("save")
            const newState: LoginInfo = { ...action.payload, status: 'saved' }
            setCookie("member", JSON.stringify(newState), 1)
            return newState
        },
        logout: () => {
            console.log("logout")
            removeCookie("member")
            return { ...initState }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (_state, action) => {

            console.log("fulfilled", action.payload)

            if (action.payload.error) {
                return { ...initState, status: 'rejected' }
            }

            const newState: LoginInfo = { ...action.payload, status: 'fulfilled' }

            setCookie("member", JSON.stringify(newState), 1)

            return newState
        })
            .addCase(loginPostAsync.pending, (state) => {
                console.log("pending")
                state.status = 'pending'
            })
            .addCase(loginPostAsync.rejected, (state) => {
                console.log("rejected")
                state.status = 'rejected'
            })
    }
})

export const { save, logout } = loginSlice.actions

export default loginSlice.reducer