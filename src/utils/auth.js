import Cookies from 'js-cookie'
const TokenKey = "USER"

export function getToken() {
    return Cookies.get( TokenKey )
}

export function setToken(userName) {
    Cookies.set( TokenKey, userName )
}