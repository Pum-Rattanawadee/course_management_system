
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCreateCourse } from "./useCourse";
import { CoursesResponse, CreateCoursesDTO } from "../../model/courseModel";

type ModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  };

const CourseForm = ({ setShowModal }: ModalProps) => {
    
  
    const courseDTO:CreateCoursesDTO = {
        name:'c# สำหรับธุรกิจขายผัก',
        category:'c#',
        description:'มาขายผักกันเถอะ',
        image:'https://resource.skilllane.com/courses/highlight_imgs/000/001/680/medium/DataSC-660x390-Text-Analytic_1662725925.jpg',
        subject:'ธุรกิจ',
        startTime:new Date(),
        endTime:new Date(),
        numberOfStudent: 20,
        creditPrice:20000,
        nonCreditPrice:10000
    }

    const [course, setCourse] = useState(courseDTO)

  
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const  UserCreateCourse = async () =>  {
       
        const result = await useCreateCourse(course).course()
        console.log(result)
        setShowModal(false)
        // if(result.statusCode == 200){
           
        // }
       
     }

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name
        setCourse({...course, [field]: e.target.value})
    }

    const updateTextAreaField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const field = e.target.name
        setCourse({...course, [field]: e.target.value})
    }


    const handleCategoryEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      
        setCourse({ ...course, ["category"]:event.target.value });
    };
    const handleSubjectEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      
        setCourse({ ...course, ["subject"]:event.target.value });
    };
    return (
        <div className="modal fade" id="createCourseModal" aria-labelledby="createCourseLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCourseLabel">
                สร้างหลักสูตร
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                    <label  className="form-label">ชื่อหลักสูตร</label>
                    <input type="text" className="form-control"  placeholder="" name='name' onChange={updateField}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">วิชา</label>
                    <select className="form-select" aria-label="กรุณาเลือกวิชา" value={course.subject}  onChange={handleSubjectEventChange}>
                        <option selected>เลือกวิชา</option>
                        <option value="python">Python</option>
                        <option value="dataScient">Data Scient</option>
                        <option value="c#">C#</option>
                        <option value="ภาษาจีน">ภาษาจีน</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label  className="form-label">หมวดหมู่</label>
                    <select className="form-select" aria-label="กรุณาเลือกหมวดหมู่"  value={course.category} onChange={handleCategoryEventChange}>
                        <option selected>เลือกหมวดหมู่</option>
                        <option value="การเขียนโปรแกรม">การเขียนโปรแกรม</option>
                        <option value="ธุรกิจ">ธุรกิจ</option>
                        <option value="ภาษาต่างประเทศ">ภาษาต่างประเทศ</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label  className="form-label">ราคาแบบเก็บหน่วยกิต</label>
                    <input type="text" className="form-control"  placeholder="" name='creditPrice' onChange={updateField}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">ราคาแบบไม่เก็บหน่วยกิต</label>
                    <input type="text" className="form-control"  placeholder="" name='nonCreditPrice' onChange={updateField}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">วันที่เปิดหลักสูตร</label>
                    <br></br>
                    <DatePicker selected={startDate} 
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy HH:mm"
                        showTimeInput 
                        onChange={(date:Date) =>  setCourse({ ...course, ["startTime"]:date })} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">วันที่ปิดหลักสูตร</label>
                    <br></br>
                    <DatePicker selected={endDate}  
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy HH:mm"
                        showTimeInput  
                        onChange={(date:Date) =>  setCourse({ ...course, ["endTime"]:date })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">รายละเอียด</label>
                    <textarea className="form-control"  name='description' onChange={updateTextAreaField}></textarea>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-primary" onClick={UserCreateCourse}>บันทึก</button>
           
            </div>
          </div>
        </div>
      </div>
    )
}

export default CourseForm;

