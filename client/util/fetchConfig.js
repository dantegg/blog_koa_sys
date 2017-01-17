/**
 * Created by dantegg on 2017/1/7.
 */
export const FETCH_POST = {
    method:'post',
    credentials: 'include',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json, text/plain,*/*;q=0.01'
    },
}

export const FETCH_GET = {
    method:'get',
    credentials:"include",
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json, text/plain,*/*;q=0.01'
    }
}