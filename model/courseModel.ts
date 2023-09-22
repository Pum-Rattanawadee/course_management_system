export type CoursesResponse = {
    id: string
    name: string
    description: string
    category: string
    image: string
    subject: string
    startTime: string
    endTime: string
    numberOfStudent: number
    instructorInfo: Instructor
  }

  export type Instructor = {
    id: string
    firstName: string
    lastName: string
    role: string
    image: string
   
  }

  export type CreateCoursesDTO = {
    name: string
    description: string
    category: string
    image: string
    subject: string
    startTime: Date
    endTime: Date
    numberOfStudent: number,
    creditPrice:number
    nonCreditPrice: number
  }