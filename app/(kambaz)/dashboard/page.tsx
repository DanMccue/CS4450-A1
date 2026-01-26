import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
return (
    <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
        <div id="wd-dashboard-courses">
            <div className="wd-dashboard-course">
                <Link href="/courses/2800" className="wd-dashboard-course-link">
                    <Image src="/images/logicComp.jpg" width={200} height={150} alt="Logic and Computation" />
                    <div>
                        <h5> CS2800 Logic and Computation </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/3000" className="wd-dashboard-course-link">
                    <Image src="/images/Algo.jpg" width={200} height={150} alt="Algorithms" />
                    <div>
                        <h5> CS3000 Algorithms </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/2550" className="wd-dashboard-course-link">
                    <Image src="/images/Cyber.jpg" width={200} height={150} alt="Cyber Security" />
                    <div>
                        <h5> CY2550 Cyber Security </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/2500" className="wd-dashboard-course-link">
                    <Image src="/images/Fundies.jpg" width={200} height={150} alt="Fundamentals" />
                    <div>
                        <h5> CS2500 Fundamentals of Computer Science </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/3650" className="wd-dashboard-course-link">
                    <Image src="/images/Systems.jpg" width={200} height={150} alt="Computer Systems" />
                    <div>
                        <h5> CS3650 Computer Systems </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/3200" className="wd-dashboard-course-link">
                    <Image src="/images/Database.jpg" width={200} height={150} alt="Database Design" />
                    <div>
                        <h5> CS3200 Database Design </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link href="/courses/3500" className="wd-dashboard-course-link">
                    <Image src="/images/OOD.jpg" width={200} height={150} alt="OOD" />
                    <div>
                        <h5> CS3500 Object Oriented Design </h5>
                        <p className="wd-dashboard-course-title">
                            Fall 2026
                        </p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    </div>
);}
