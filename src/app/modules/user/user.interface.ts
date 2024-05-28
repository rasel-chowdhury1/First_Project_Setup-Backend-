
export type Tuser = {
    id: string,
    password: string,
    needsPasswordChange: boolean,
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}

export type TnewUser = {
    password: string,
    role: string,
    id: string
}