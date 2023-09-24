
import { CreateCoursesDTO, SearchCoursesDTO } from "../../model/courseModel";
import { CourseService } from "../../services/courseServices";

export const useCourse = (filterData?: SearchCoursesDTO) => {
    const course = async () => {
        const courseAPI = new CourseService("http://159.65.218.149:3030")
        let queryString = ""
        console.log(filterData)
        if (filterData != null){
           
            if (filterData.name  && filterData.name != '' && filterData.startTime != null){
                queryString += "?name="+filterData.name+"&startTime="+filterData.startTime 
            }
            else if (filterData.name  &&  filterData.name != '' && filterData.startTime == null){
                queryString += "?name="+filterData.name
            }
            else if (!filterData.name && filterData.startTime != null){
                queryString += "?startTime="+filterData.startTime
            }
           
        }
    
        const  courses = await courseAPI.getcourses(queryString)
        return  {statusCode: 200 ,data:courses}
       
    }
   
    return { course }
}

export const useCreateCourse = (createCoursesDTO:CreateCoursesDTO) => {
    const course = async () => {
        const courseAPI = new CourseService("http://159.65.218.149:3030")
        const courses = await courseAPI.createcourses(createCoursesDTO)

        return  {statusCode: 200 ,data:courses}
    }
   
    return { course }
}

export const useUploadFile = (file:File) => {
    const course = async () => {
        const courseAPI = new CourseService("http://159.65.218.149:3030")
        const fileName = await courseAPI.uploadfile(file)

        return  {statusCode: 200 ,data:fileName}
    }
   
    return { course }
}