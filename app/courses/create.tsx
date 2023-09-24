
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCreateCourse,useUploadFile } from "./useCourse";
import {  CreateCoursesDTO } from "../../model/courseModel";

type ModalProps = {
    setIsShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  };

const CourseForm = ({ setIsShowCreateModal }: ModalProps) => {
    const fileData: File|null=null
    const [fileCoverValue, setFileCoverValue] = React.useState<File|null>(fileData);

    const courseDTO:CreateCoursesDTO = {
        name:'',
        category:'',
        description:'',
        image:'',
        subject:'',
        startTime:new Date(),
        endTime:new Date(),
        numberOfStudent: 0,
        creditPrice:0,
        nonCreditPrice:0
    }
   

    const [course, setCourse] = useState(courseDTO)
    const [isUploadDone, setisUploadDone] = useState(false)

    const  UserUploadFile = async () =>  {
     
        if (fileCoverValue != null){
           const responseUpload = await useUploadFile(fileCoverValue as File).course()
           if(responseUpload.statusCode == 200){
             course.image =responseUpload.data
             setisUploadDone(true)
           }
        }
      
     }

    const  UserCreateCourse = async () =>  {
     
        if (fileCoverValue != null){
           const responseUpload = await useUploadFile(fileCoverValue as File).course()
           if(responseUpload.statusCode == 200){
             course.image =responseUpload.data
           }
        }
        await useCreateCourse(course).course()
        
        setIsShowCreateModal(false)
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



    const handleFileCoverChange = async (event:React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            const fileValue =event.currentTarget.files[0]
            setFileCoverValue(fileValue);
        }
      };

      useEffect(() => {
        const funcCreateCourses = async () => {
            if(isUploadDone){
                UserCreateCourse()
            }
           
        };
     
        funcCreateCourses()
    }, [isUploadDone]);

    return (
        <div className="modal fade" id="createCourseModal" aria-labelledby="createCourseLabel" aria-hidden="true" >
            <div className="modal-dialog modal-lg">
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
                            <input type="text" className="form-control"  placeholder="" name='subject' onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">หมวดหมู่</label>
                            <select className="form-select" aria-label="กรุณาเลือกหมวดหมู่" value={course.category} onChange={handleCategoryEventChange}>
                                <option value="เลือกหมวดหมู่" >เลือกหมวดหมู่</option>
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
                            <DatePicker selected={course.startTime} 
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy HH:mm"
                                showTimeInput 
                                onChange={(date:Date) =>  setCourse({ ...course, ["startTime"]:date })} />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">วันที่ปิดหลักสูตร</label>
                            <br></br>
                            <DatePicker selected={course.endTime}  
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy HH:mm"
                                showTimeInput  
                                onChange={(date:Date) =>  setCourse({ ...course, ["endTime"]:date })} />
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">จำนวนนักเรียน</label>
                            <input type="text" className="form-control"  placeholder="" name='numberOfStudent' onChange={updateField}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">รายละเอียด</label>
                            <textarea className="form-control"  name='description' onChange={updateTextAreaField}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">อัพโหลดรูปหน้าปก</label>
                            <input className="form-control"  name='file' type="file" onChange={handleFileCoverChange}></input>
                        </div>
                        
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={UserUploadFile}>บันทึก</button>
                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseForm;

