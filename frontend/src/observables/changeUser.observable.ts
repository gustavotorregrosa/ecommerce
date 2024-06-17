import { IUser } from '@/providers/authProvider'
import {Observable, Subscriber} from 'rxjs'

let changeUserObservable: Observable<IUser>

export const getChangeUserObservable = (changeFN: Function) :Observable<IUser> => {
    if(!changeUserObservable){
        changeUserObservable = new Observable<IUser>(subscriber => changeFN = subscriber.next)
    }

    return changeUserObservable
}


