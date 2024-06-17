import { IUser } from '@/providers/authProvider'
import {Observable} from 'rxjs'

let changeUserObservable: Observable<IUser>

export const getChangeUserObservable = (user: IUser) :Observable<IUser> => {
    if(!changeUserObservable){
        changeUserObservable = new Observable<IUser>(subscriber => subscriber.next(user))
    }

    return changeUserObservable
}


