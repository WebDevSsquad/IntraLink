<<<<<<< Updated upstream
import { useRef, useState, useEffect } from "react";
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
>>>>>>> Stashed changes
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
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import AddSkillButton from "./sub/add-skill";
import EditForm from "./sub/edit-form-popup";

import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();

  const divider = <div className="divider" />;
  const logged_id = useSelector((state) => state.user.userID);
  const { user_id } = useParams();
  const sameID = logged_id === user_id;
  const inputRef = useRef("");
  const [isProfileImageHovered, setIsProfileImageHovered] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [activeSection, setActiveSection] = useState("About");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isAvailableTM, setIsAvailableTM] = useState(false);
  const [isAvailableCon, setIsAvailableCon] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
<<<<<<< Updated upstream
          `http://localhost:8080/profile/get_user_info/${id}`
        );
        const data = await response.json();
        const info = data.userInfo.rows[0];
        //console.log(info);
=======
          `http://localhost:8080/profile/get_user_info/${user_id}`
        );
        const data = await response.json();
        const info = data.userInfo.rows[0];
>>>>>>> Stashed changes
        setFullName(info.firstname + " " + info.lastname);
        setEmail(info.email);
        setProfilePicture(info.picture);
        setSkills(info.skills);
        setIsAvailableTM(info.available_tm);
        setIsAvailableCon(info.available_con);
        setLocation(info.location);
        setPhone(info.phone);
        setAbout(info.about);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
    removeSkillData(index + 1);
  };

  const handleAddSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
    updateSkillData(newSkill);
  };
  const handleSetAbout = () => {
    setAbout(inputRef.current.value);
    updateAbout(inputRef.current.value);
  };
  const handleEditedInfo = (editedData) => {
    const {
      isAvailableCon = false,
      isAvailableTM = false,
      email = "",
      location = "",
      phone = "",
    } = editedData;

    setEmail(email);
    setPhone(phone);
    setLocation(location);
    setIsAvailableTM(isAvailableTM);
    setIsAvailableCon(isAvailableCon);

    const newData = {
      available_con: isAvailableCon,
      available_tm: isAvailableTM,
      email: email,
      location: location,
      phone: phone,
    };

    updateUserData(newData);
  };

  const updateUserData = async (newData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/profile/update_user_info/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      const updatedData = await response.json();
      console.log(updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const updateAbout = async (newAbout) => {
    console.log(newAbout);
    try {
      const response = await fetch(
        `http://localhost:8080/profile/update_about/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ about: newAbout }),
        }
      );

      const updatedAbout = await response.json();
      console.log(updatedAbout);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const updateSkillData = async (newSkill) => {
    try {
      const response = await fetch(
        `http://localhost:8080/profile/update_skills/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skill: newSkill }),
        }
      );

      const updatedskill = await response.json();
      console.log(updatedskill);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const removeSkillData = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:8080/profile/remove_skill/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ index: index }),
        }
      );

      const updatedskills = await response.json();
      console.log(updatedskills);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const sections = ["About", "Skills"];

  return (
    <div
      className={`profile-container ${
        isEditFormOpen ? "add-modal-overlay" : ""
      }`}
    >
      <div className="profile-card">
        <div
          className={`profile-image-full ${sameID ? "profile-image-hov" : ""}`}
          onMouseEnter={() => setIsProfileImageHovered(true)}
          onMouseLeave={() => setIsProfileImageHovered(false)}
        >
          <img
            src={profilePicture}
            alt="Profile Picture"
            className={`profile-image ${sameID ? "profile-image-hov" : ""}`}
          />
          {isProfileImageHovered && sameID && (
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
                  handleEditedInfo(editedData);
                  close();
                }}
              />
            )}
          </Popup>
        </div>
        <div className="profile-description">
          <h1>{fullName}</h1>
          {/* (change) */}
          <p className="job-title">Project Manager</p>
        </div>
<<<<<<< Updated upstream
        <button className="message-button">
          Message
        </button>
=======
        {!sameID && <button className="message-button">Message</button>}
>>>>>>> Stashed changes
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
        {sameID && <button className="logout-button">LogOut</button>}
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
                {isEditingAbout ? (
                  <>
                    <div className="edit-about-container">
                      <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="edit-textarea"
                        autoFocus
                        onFocus={(e) => {
                          let tempValue = e.target.value;
                          e.target.value = "";
                          e.target.value = tempValue;
                        }}
                        ref={inputRef}
                      />
                      <div className="button-container">
                        <button
                          onClick={() => {
                            setIsEditingAbout(false);
                            handleSetAbout();
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="about-text">
                      <p>{about}</p>
                    </div>
                    {sameID && (
                      <div
                        className="edit-circle-container"
                        onClick={() => setIsEditingAbout(true)}
                      >
                        <FontAwesomeIcon icon={faPen} className="arrow-icon" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {activeSection === "Skills" && (
            <>
              <div className="skills">
                <div className="skill-buttons">
<<<<<<< Updated upstream
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
=======
                  {skills !== null &&
                    skills.map((skill, index) => (
                      <div className="skill-button" key={index}>
                        <div className="skill-text">{skill}</div>
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="remove-skill-icon"
                          onClick={() => handleRemoveSkill(index)}
                        />
                      </div>
                    ))}
                  {sameID && <AddSkillButton onAddSkill={handleAddSkill} />}
>>>>>>> Stashed changes
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
        <div className="project-show-card">
          <div className="project-title">Project Alpha</div>
        </div>

        <div className="project-show-card">
          <div className="project-title">Project Beta</div>
        </div>

        <div className="project-show-card">
          <div className="project-title">Project Gamma</div>
        </div>
      </div>
    </div>
  );
}
