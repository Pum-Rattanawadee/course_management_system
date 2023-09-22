import axios, { AxiosInstance } from "axios";
import  Cookies  from "js-cookie"
import { CoursesResponse, CreateCoursesDTO } from "../model/courseModel";

export class CourseService {
    protected readonly instance: AxiosInstance

    public constructor (url: string) {
        const token = Cookies.get("accesstoken")
        this.instance = axios.create({
            headers: {
                Authorization : `Bearer ${token}`,
                },
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: 'time out',
            
        })
    }

    getcourses():Promise<CoursesResponse[]>{
        return this.instance.get("/course")
        .then((res) => {
            return res.data as CoursesResponse[]
        })
    }
    createcourses(data:CreateCoursesDTO):Promise<CoursesResponse[]>{
        return this.instance.post("/course", {
            ...data
        })
        .then((res) => {
            return res.data as CoursesResponse[]
        })
    }
}