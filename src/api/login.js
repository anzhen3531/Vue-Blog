import request from "@/utils/userlogin";

export function login(name, password) {
    return request({
        url: `/user/login`,
        method: 'post',
        params:{
            username: name,
            password: password
        }
    })
}

export function outLoginUser() {
    return request({
        url: `/user/logout`,
        method: 'post'
    })
}
