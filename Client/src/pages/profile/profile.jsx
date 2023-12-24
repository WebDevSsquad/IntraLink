import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";

import {
  faTimes,
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import AddSkillButton from "./sub/add-skill";
import EditForm from "./sub/edit-form-popup";

import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const profilePicture =
    "https://shiftart.com/wp-content/uploads/2017/04/RC-Profile-Square.jpg";
  const divider = <div className="divider" />;
  const initialPhone = useSelector((state) => state.user.phone);
  const initialLocation = useSelector((state) => state.user.location);
  const initialEmail = useSelector((state) => state.user.email);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const fullName = firstName + " " + lastName;
  const about =
    "Project manager that strives to be the best amongst others. I have every single required skill to be easily the best.";
  const availableTM = useSelector((state) => state.user.isAvailableTM);
  const availableCon = useSelector((state) => state.user.isAvailableCon);
  const initialSkills = useSelector((state) => state.user.skills);
  const sections = ["About", "Skills"];
  const [isProfileImageHovered, setIsProfileImageHovered] = useState(false);
  const [skills, setSkills] = useState(initialSkills);
  const [phone, setPhone] = useState(initialPhone);
  const [location, setLocation] = useState(initialLocation);
  const [email, setEmail] = useState(initialEmail);
  const [activeSection, setActiveSection] = useState("About");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isAvailableTM, setIsAvailableTM] = useState(availableTM);
  const [isAvailableCon, setIsAvailableCon] = useState(availableCon);

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleAddSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
  };

  return (
    <div
      className={`profile-container ${
        isEditFormOpen ? "add-modal-overlay" : ""
      }`}
    >
      <div className="profile-card">
        <div
          className="profile-image-full"
          onMouseEnter={() => setIsProfileImageHovered(true)}
          onMouseLeave={() => setIsProfileImageHovered(false)}
        >
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="profile-image"
          />
          {isProfileImageHovered && (
            <div
              className="image-overlay"
              onClick={() => setIsEditFormOpen(true)}
            >
              Edit Profile
            </div>
          )}
          <Popup
            open={isEditFormOpen}
            onClose={() => setIsEditFormOpen(false)}
            modal
            nested
          >
            {(close) => (
              <EditForm
                email={email}
                phone={phone}
                location={location}
                isAvailableTM={isAvailableTM}
                isAvailableCon={isAvailableCon}
                onSave={(editedData) => {
                  setEmail(editedData.email);
                  setPhone(editedData.phone);
                  setLocation(editedData.location);
                  setIsAvailableTM(editedData.isAvailableTM);
                  setIsAvailableCon(editedData.isAvailableCon);
                  close();
                }}
              />
            )}
          </Popup>
        </div>
        <div className="profile-description">
          <h1>{fullName}</h1>
          <p className="job-title">Project Manager</p>
        </div>
        <button className="message-button">Message</button>
        <div className="user-info">
          <div className="icon-container">
            <FontAwesomeIcon icon={faPhone} className="font-icon" />
            <span className="info-line-text">{phone}</span>
          </div>
          <div className="icon-container">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="font-icon" />
            <span className="info-line-text">{location}</span>
          </div>
          <div className="icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="font-icon" />
            <span className="info-line-text">{email}</span>
          </div>
          <div className="availability">
            <label>Available TM: </label>
            <span style={{ color: isAvailableTM ? "#4CAF50" : "#FF0000" }}>
              {isAvailableTM ? "Yes" : "No"}
            </span>
          </div>
          <div className="availability">
            <label>Available Con: </label>
            <span style={{ color: isAvailableCon ? "#4CAF50" : "#FF0000" }}>
              {isAvailableCon ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>

      <div className="middle-section">
        <div className="profile-sections">
          <div className="filter-section">
            {sections.map((section) => (
              <div
                key={section}
                className={`section-word ${
                  activeSection === section ? "active" : ""
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </div>
            ))}
          </div>
          {activeSection === "About" && (
            <>
              <div className="about">
                <p>{about}</p>
              </div>
            </>
          )}

          {activeSection === "Skills" && (
            <>
              <div className="skills">
                <div className="skill-buttons">
                  {skills.map((skill, index) => (
                    <div className="skill-button" key={index}>
                      <div className="skill-text">{skill}</div>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="remove-skill-icon"
                        onClick={() => handleRemoveSkill(index)}
                      />
                    </div>
                  ))}
                  <AddSkillButton onAddSkill={handleAddSkill} />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="statistics-boxes">
          <div className="left-statistics-box">
            <div className="left-statistics-section">
              <div className="left-statistics-item">
                <p className="left-statistics-text">Income</p>
                <p className="left-statistics-amount">$3500</p>
              </div>
              <div className="circle-container">
                <FontAwesomeIcon icon={faArrowTrendUp} className="arrow-icon" />
              </div>
            </div>
            <div className="left-statistics-section">
              <div className="left-statistics-item">
                <p className="left-statistics-text">Spendings</p>
                <p className="left-statistics-amount">$950</p>
              </div>
              <div className="circle-container">
                <FontAwesomeIcon
                  icon={faArrowTrendDown}
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>
          <div className="right-statistics-box"></div>
        </div>
        <div className="larger-statistics-box"></div>
      </div>
      <div className="right-section">
        <div className="project-header">Current Projects</div>
        {divider}

        {/* Fake Project Cards */}
        <div className="project-card">
          <div className="project-title">Project Alpha</div>
        </div>

        <div className="project-card">
          <div className="project-title">Project Beta</div>
        </div>

        <div className="project-card">
          <div className="project-title">Project Gamma</div>
        </div>
      </div>
    </div>
  );
}
