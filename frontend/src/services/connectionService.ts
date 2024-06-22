import { IState } from "@/store";
import { EnhancedStore } from "@reduxjs/toolkit";


export class ConnectionService {

    constructor(public store: EnhancedStore<IState>) {}

    generateHeaders = () => {
        return {
            Authorization: `Bearer ${this.store.getState().user.access_token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    makeRequest = async <T>(endpoint: string, method: 'get' | 'post' | 'patch', body?: string) => {
        const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            headers: this.generateHeaders(),
            method,
            body
        })

        return await result.json() as T
    }

}