import axios, { AxiosInstance } from "axios";

export class AuthService {
    protected readonly instance: AxiosInstance

    public constructor (url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: 'time out'
        })
    }

    login(username: string, password: string) {
        return this.instance.post("/auth", {
            username,
            password
        })
        .then((res) => {
            return {
                username: res.data.response.user.username,
                token: res.data.response.token,
                role: res.data.response.user.role
            }
        })
    }
}