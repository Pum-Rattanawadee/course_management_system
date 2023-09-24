import axios, { AxiosInstance } from "axios";
import  Cookies  from "js-cookie"
import { CoursesResponse, CreateCoursesDTO } from "../model/courseModel";

export class CourseService {
    protected readonly instanceJson: AxiosInstance
    protected readonly instanceFromData: AxiosInstance

    public constructor (url: string) {
        const token = Cookies.get("accesstoken")
        this.instanceJson = axios.create({
            headers: {
                Authorization : `Bearer ${token}`,
                },
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: 'time out',
            
        })
        this.instanceFromData = axios.create({
            headers: {
                Authorization : `Bearer ${token}`,
                "content-type": "multipart/form-data"
            },
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: 'time out',
            
        })
    }

    getcourses(queryString?: string):Promise<CoursesResponse[]>{
        return this.instanceJson.get("/course"+queryString)
        .then((res) => {
            return res.data as CoursesResponse[]
        })
    }

    createcourses(data:CreateCoursesDTO):Promise<CoursesResponse[]>{
        return this.instanceJson.post("/course", {
            ...data
        })
        .then((res) => {
            return res.data as CoursesResponse[]
        })
    }

    uploadfile(data:File):Promise<string>{
        const formData = new FormData();
        formData.append("file", data, data.name);

        return this.instanceFromData.post("/course/upload", formData)
        .then((res) => {
            return res.data 
        })
    }
}