import Cookies from 'js-cookie'
const TokenKey = "USER"

export function getToken() {
    return Cookies.get( TokenKey )
}

export function getUserId(){
    return Cookies.get( 'UserId' )
}

export function setUserId(userid){
    Cookies.set('UserId',userid)
}

export function setToken(userName) {
    Cookies.set( TokenKey, userName )
}