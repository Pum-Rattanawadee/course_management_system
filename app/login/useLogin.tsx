
import { AuthService } from "../../services/authServices";
import  Cookies  from "js-cookie"

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const auth = new AuthService("")
        const user = await auth.login(username, password)
        if (user) {
            Cookies.set("accesstoken", user.token)
        }

        return  {statusCode: 200 ,data:user}
    }
   
    return { login }
}