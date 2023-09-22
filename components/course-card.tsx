import { CoursesResponse } from '../model/courseModel'
import styles from './styles.module.css'


const CourseCard = (props:any) => {
    const {courseData} = props
    return (
        <div className="row border p-2 p-lg-0 mx-1 mx-lg-0 my-lg-2">
            <div className="col-3 col-lg-12 p-0">
                <img className="img-fluid" src={courseData.image}/>
            </div>
            <div className="col-9 col-lg-12 mt-3">
                <div className="col-lg-12">
                    <div className={styles.courseCardHeader}>{courseData.name}</div>
                </div>
                <div className="col-lg-12">
                    <div className="row">
                        <div className="d-none d-lg-block col-lg-2">
                            <img className={styles.courseCardImgDetail} src={courseData.instructorInfo.image}/>
                        </div>
                        <div className="col-12 col-lg-10"><span className={styles.courseCardDetail}>{courseData.instructorInfo.firstName} {courseData.instructorInfo.lastName}</span></div>
                    </div>
                </div>
                <div className="d-none d-lg-block col-lg-12">
                    <div className="row">
                        <div className="col-lg-2">
                            <img className={styles.courseCardImgDetail} src="https://resource.skilllane.com/users/images/001/149/067/thumb/1200px-Emblem_of_Thammasat_University.svg.png?1565079967"/>
                        </div>
                        <div className="col-lg-10"><span className={styles.courseCardDetail}>มหาวิทยาลัยธรรมศาสตร์</span></div>
                    </div>
                </div>
                <div className="col-lg-12 text-end mt-3">
                    <div className={styles.priceDetail}>
                        <span className={styles.price}>1,500 บาท</span>
                        <span className={styles.unit}>ไม่เก็บหน่วยกิต</span>
                    </div>
                </div>
                <div className="col-lg-12 text-end mb-2">
                    <div className={styles.priceDetail}>
                        <span className={styles.price}>4,500 บาท</span>
                        <span className={styles.unit}>เก็บหน่วยกิต</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;

