import React, { createContext, useContext, useState } from "react"

interface IAuthProviderProps {
    children: React.ReactNode
}

interface IUser {
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
}

export const AuthProvider: React.FunctionComponent<IAuthProviderProps> = ({children}: IAuthProviderProps) => {

    const [user, setUser] = useState<IUser | null>(null)

    const login = (user: IUser) => setUser(user)
    const logout = () => setUser(null)

    const renewAccessToken = (access_token: string) => {
        
        user && setUser(_user => {
            return {
                ..._user,
                access_token
            } as IUser
        })
    }

    const renewRefreshAccessToken = (access_refresh_token: string) => {
        
        user && setUser(_user => {
            return {
                ..._user,
                access_refresh_token
            } as IUser
        })
    }

    return  <AuthContext.Provider value={{login, logout, renewAccessToken, renewRefreshAccessToken}}>
        {children}
    </AuthContext.Provider>
    
}

const AuthContext = createContext<IAuthProviderFunctions>({
    login: (user: IUser) => {},
    logout: () => {},
    renewAccessToken: (access_token: string) => {},
    renewRefreshAccessToken: (access_refresh_token: string) => {}
})

export const useAuth = () => useContext(AuthContext)