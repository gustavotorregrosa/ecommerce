import { getChangeUserObservable } from "@/observables/changeUser.observable"
import React, { createContext, useContext, useEffect, useState } from "react"

interface IAuthProviderProps {
    children: React.ReactNode
}

export interface IUser {
    id: string
    email: string
    name: string
    access_token: string
    access_refresh_token: string
}

interface IAuthProviderFunctions {
    login: (user: IUser) => void
    logout: () => void
    renewAccessToken: (access_token: string) => void
    renewRefreshAccessToken: (access_refresh_token: string) => void
    showUser: () => void
}

export const AuthProvider: React.FunctionComponent<IAuthProviderProps> = ({children}: IAuthProviderProps) => {

    // const [user, setUser] = useState<IUser | null>()

    // useEffect(() => {
    //     setTimeout(() => {
    //         login({
    //             id: '12344',
    //             email: 'felipe.torregrosa@gmail.com',
    //             name: 'felipe torregrosa',
    //             access_token: 'felipe 23456',
    //             access_refresh_token: 'felipe 098765'
    //           })
    //     }, 50000)

    // }, [])

    // useEffect(() => {
    //      changeUserObservable.subscribe(data => setUser(data as IUser))
    //      setTimeout(() => {
    //         changeUserSubscriber.next('test gustavo')
    //      }, 5000)
    // }, [])

    // useEffect(() => {
    //     console.log({changeUserObservable})
    //     changeUserObservable.subscribe(data => setUser(data as IUser))
    //     console.log({changeUserObservable})
    // }, [])

    let setUser: () => void

    const changeUserObservable = getChangeUserObservable(setUser)
    // console.log({changeUserObservable})
    // changeUserObservable.subscribe(data => setUser(data as IUser))
    // console.log({changeUserObservable})
    // const setUser = (_user: IUser | null) => changeUserObservable.subscribe


    let user: IUser | null
    const _setUser = (_user: IUser | null) => {
        !_user && (user = null)

        _user && (user = {...user, ..._user})
    }

    const login = (_user: IUser) => {
        setUser(_user)
    }
    const logout = () => setUser(null)

    const showUser = () => user

    const renewAccessToken = (access_token: string) => {
        user && setUser({
            ...user,
            access_token
        })
    }

    const renewRefreshAccessToken = (access_refresh_token: string) => { 
        user && setUser({
            ...user,
            access_refresh_token
        })
    }
   
    return <AuthContext.Provider value={{login, logout, renewAccessToken, renewRefreshAccessToken, showUser}}>
        {children}
    </AuthContext.Provider>
    
}

const AuthContext = createContext<IAuthProviderFunctions>({
    login: (user: IUser) => {},
    logout: () => {},
    renewAccessToken: (access_token: string) => {},
    renewRefreshAccessToken: (access_refresh_token: string) => {},
    showUser: () => {}
})

export const useAuth = () => useContext(AuthContext)