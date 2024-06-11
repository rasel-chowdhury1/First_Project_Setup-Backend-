

export type TLoginUser = {
     id: string,
     password: string
}

export type TChangePassword = {
     oldPassword: string,
     newPassword: string
}

export type TDecode = {
     userId: String,
     role: String,
     iat: Number,
     exp: Number
 }