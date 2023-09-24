'use client';

import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";

import CourseCard from "../../components/course-card";
import { useCourse } from './useCourse';
import { CoursesResponse, SearchCoursesDTO } from "../../model/courseModel";
import CourseForm from './create';
import { useRouter } from 'next/navigation'
import { useLogout } from '../login/useLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClock } from '@fortawesome/free-solid-svg-icons'
import  Cookies  from "js-cookie"
let createCourseFormModal: any

export default function Courses() {
   //SearchCoursesDTO
    let [courses, setCourses] = useState<CoursesResponse[]>()
    const [filterData, setFilterData] = useState<SearchCoursesDTO>();
    let [searchDate, setSearchDate] = useState<Date | undefined>();
    const userRole = Cookies.get("userrole") as string
    const [isShowCreateModal, setIsShowCreateModal] = useState(false)
   
    const FuncGetCourses = async () => {
      
        const { data } =   await useCourse(filterData).course()

        setCourses(data);
      };
    
    const createCourseModal = () => {
        const { Modal } = require("bootstrap");
        if (!createCourseFormModal) {
            createCourseFormModal = new Modal("#createCourseModal")
        }
        if (isShowCreateModal) {
            createCourseFormModal.show();
          
            
        } else {
            createCourseFormModal.hide();
        }
       
    };

    const showCreateModal = () => {
        setIsShowCreateModal(true)
        createCourseModal()
    }

    const updateFieldFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name
        setFilterData({...filterData, [field]: e.target.value})
    }

    const setDate = (date: Date) => {
        setSearchDate(date)
        let dateFormat: string = ""
        if (date) {
            dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
        }
        setFilterData({ ...filterData, ["startTime"]:dateFormat })
    }


    const router = useRouter();
    const  UserLogout = () =>  {
        useLogout().logout()
        router.replace("/login")     
    }

    useEffect(() => {
      
        createCourseModal()
        FuncGetCourses();
    }, [isShowCreateModal]);


    return (
        <>
        <nav className="nav nav-pills bg-danger justify-content-end">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                    Menu
                </a>
                <ul className="dropdown-menu">
                    {userRole == 'instructor' && <li><a className="dropdown-item" href="#" onClick={showCreateModal}>สร้างหลักสูตร</a></li>}
                    <li><a className="dropdown-item" href="#" onClick={UserLogout}>ออกจากระบบ</a></li>
                </ul>
            </li>
        </nav>
        <div className="container-lg">
            <h3 className="mt-3 text-center">หลักสูตรทั้งหมด</h3>
            <hr />
            <div className="row">
                <div className="col-12 col-lg-7">
                    <div className="input-group mb-1 w-100">
                        <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" className="form-control" placeholder="ชื่อหลักสูตร" aria-label="ชื่อหลักสูตร" name='name' onChange={updateFieldFilter}/>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <div className="input-group mb-3 w-100">
                        <span className="input-group-text"><FontAwesomeIcon icon={faClock} /></span>
                        <DatePicker
                            className="form-control rounded-0"
                            timeInputLabel="Time:"
                            dateFormat="dd/MM/yyyy HH:mm"
                            selected={searchDate}
                            showTimeInput
                            onChange={(date:Date) => setDate(date)} />
                        <button className="btn btn-outline-secondary" type="button"  onClick={FuncGetCourses}>ค้นหา</button>
                    </div>
                </div>
            </div>
            <div className="row row-cols-lg-5 row-cols-1">
                {
                    courses?.map((course,index) => (
                        <div className="col" key={index}>
                            <CourseCard courseData={course} />
                        </div>
                    ))

              
                }
            </div>

            <CourseForm setIsShowCreateModal={setIsShowCreateModal} />
        </div>
        </>
    )
}