'use client';

import React, { useState, useEffect } from 'react'
import CourseCard from "../../components/course-card";
import { useCourse } from './useCourse';
import { CoursesResponse } from "../../model/courseModel";
import CourseForm from './create';

export default function courses() {
   
    let [courses, setCourses] = useState<CoursesResponse[]>()
    const [isCreated, setIsCreated] = useState(false)
    const [showModal, setShowModal] = useState(true);
    const [isShowCreateModal, setIsShowCreateModal] = useState(true)
    let createCourseFormModal: any
    
    const createCourseModal = () => {
        // let createCourseFormModal = new Modal("#createCourseModal")
        const { Modal } = require("bootstrap");
        if (!createCourseFormModal) {
            createCourseFormModal = new Modal("#createCourseModal")
        }
        console.log(createCourseFormModal)
        if (!isShowCreateModal) {
            console.log("show")
            createCourseFormModal.show();
            
        } else {
            console.log("hide")
            createCourseFormModal.hide();
        }
    };

    const showCreateModal = () => {
        setIsShowCreateModal(true)
        createCourseModal()
    }

    useEffect(() => {
        const funcGetCourses = async () => {
          const { data } =   await useCourse().course()

          setCourses(data);
 
        };
        console.log('in useEffect')
        console.log(showModal)
        setIsShowCreateModal(!showModal)
        createCourseModal()
        funcGetCourses();
    }, [showModal]);


    return (
        <div className="container-lg">
            <h1 className="mt-2 text-center">หลักสูตรทั้งหมด</h1>

            <button className="btn btn-primary" onClick={showCreateModal}>สร้างหลักสูตร</button>
           
            <hr />
           
            <div className="row row-cols-lg-5 row-cols-1">
                {
                    courses?.map((course,index) => (
                        <div className="col" key={index}>
                            <CourseCard courseData={course} />
                        </div>
                    ))

              
                }
            </div>

            <CourseForm setShowModal={setShowModal} />
        </div>
    )
}