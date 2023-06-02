import React from "react";
import { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { ImClock } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { Space, Spin } from "antd";
import { toast } from "react-toastify";
import NavBar from "../../../ResuableComponent/NavBar";
import { GiMoneyStack, GiSandsOfTime } from "react-icons/gi";
import Footer from "../../../ResuableComponent/Footer";
import "../../../Jobs/JobsComponents/css/SingleJobDetail.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import hostUrl from "../../../Assets/Api";

const JobApplicantDetail = () => {
  const [singleApplicantDetail, setSingleApplicantDetail] = useState({});
  const [avatar, setAvatar] = useState("");

  const param = useParams();
  const applicantId = param.id;

  useEffect(() => {
    const apiUrl = `${hostUrl}/api/company/single/applicants/of/job/detail/${applicantId}`;
    axios.get(apiUrl).then((res) => {
      setSingleApplicantDetail(res.data.applicant);

      const url = `${hostUrl}/api/company//single/applicant/avatar/${singleApplicantDetail.userID}`;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get(url, config).then((res) => {
        setAvatar(res.data.applicantAvatar.logo);
      });
    });
  }, [applicantId, singleApplicantDetail.userID]);

  return (
    <>
      <NavBar />

      <div className="container bg-image" style={{ height: "15rem" }}>
        <div className="row px-5 py-5">
          <div className="col-lg-8 col-md-12 col-sm-12 d-flex justify-content-start">
            <div className="d-flex">
              <div className="">
                <img
                  //  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcxVd5Hxs2G_4YVx0ks8pSwJBL2tzFpQBQVS1ZMmb6g&s"
                  src={avatar}
                  alt=""
                  className="applicantAvatar"
                />
              </div>
              <div className="" style={{ margin: "1rem" }}>
                <Link to="#" style={{ textDecoration: "none", color: "black" }}>
                  <h4>{singleApplicantDetail.jobTitle}</h4>
                </Link>
                <div className="list d-flex justify-content-between">
                  {/* <div className="location" style={{ fontSize: "14px" }}>
                     <FaBriefcase className="text-primary"/> Segment
                  </div> */}
                  <div className="location" style={{ fontSize: "14px" }}>
                    <GoLocation className="text-primary" />{" "}
                    {singleApplicantDetail.city},{singleApplicantDetail.country}
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="location" style={{ fontSize: "14px" }}>
                    <ImClock className="text-primary" /> 11 Hours ago
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="location" style={{ fontSize: "14px" }}>
                    <GiMoneyStack className="text-primary" />{" "}
                    {singleApplicantDetail.offeredSalary}
                  </div>
                </div>
                <div className="time d-flex justify-content-start mt-3">
                  <div
                    style={{
                      padding: "3px 20px",
                      backgroundColor: "#DDE8F8",
                      borderRadius: "12px",
                      fontSize: "13px",
                      color: "#1967d2",
                    }}
                  >
                    Full time
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      padding: "3px 20px",
                      backgroundColor: "#E1F2E5",
                      borderRadius: "12px",
                      fontSize: "13px",
                      color: "#34a853",
                    }}
                  >
                    Private
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      padding: "3px 20px",
                      backgroundColor: "#FEF2D9",
                      borderRadius: "12px",
                      fontSize: "13px",
                      color: "#f9ab00",
                    }}
                  >
                    Urgent
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-md-start justify-content-sm-start">
            <div>
              <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Download CV/Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row d-flex">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="container">
              <h5 className="job-detail">Job Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: singleApplicantDetail.jobDescription,
                }}
              ></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 d-flex-column">
            <div
              className="d-flex justify-content-lg-start"
              style={{
                backgroundColor: "#f5f7fc",
                padding: "2rem",
                borderRadius: "20px",
                maxHeight: "46rem",
              }}
            >
              <div className="fluid-container">
                <h5>Candidate Overview</h5>

                <ul class="job-overview">
                  <li className="d-flex">
                    <CiCalendarDate className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Date Posted:</h5>
                      <span>posted </span>
                    </div>
                  </li>
                  <li className="d-flex">
                    <GiSandsOfTime className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Expiration date:</h5>
                      <span>{singleApplicantDetail.applicationDeadLine}</span>
                    </div>
                  </li>
                  <li className="d-flex">
                    <GoLocation className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Location:</h5>
                      <span>
                        {singleApplicantDetail.city},
                        {singleApplicantDetail.country}
                      </span>
                    </div>
                  </li>
                  <li className="d-flex">
                    <AiOutlineUser className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Job Title:</h5>
                      <span>{singleApplicantDetail.jobTitle}</span>
                    </div>
                  </li>
                  <li className="d-flex">
                    <ImClock className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Hours:</h5>
                      <span>50h / week</span>
                    </div>
                  </li>
                  <li className="d-flex">
                    <FaCoins className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Rate:</h5>
                      <span>$15 - $25 / hour</span>
                    </div>
                  </li>
                  <li className="d-flex">
                    <GiMoneyStack className="icon text-primary" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h5>Salary:</h5>
                      <span>${singleApplicantDetail.offeredSalary}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicantDetail;
