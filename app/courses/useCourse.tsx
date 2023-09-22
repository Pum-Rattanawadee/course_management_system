
import { CreateCoursesDTO } from "../../model/courseModel";
import { CourseService } from "../../services/courseServices";

export const useCourse = () => {
    const course = async () => {
        const caourseAPI = new CourseService("")
        const courses = await caourseAPI.getcourses()

        return  {statusCode: 200 ,data:courses}
    }
   
    return { course }
}

export const useCreateCourse = (createCoursesDTO:CreateCoursesDTO) => {
    const course = async () => {
        const caourseAPI = new CourseService("")
        const courses = await caourseAPI.createcourses(createCoursesDTO)

        return  {statusCode: 200 ,data:courses}
    }
   
    return { course }
}