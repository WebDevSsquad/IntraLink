import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";

import {
  faArrowTrendDown,
  faArrowTrendUp,
  faEnvelope,
  faMapMarkerAlt,
  faPen,
  faPhone,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import AddSkillButton from "./sub/add-skill";
import EditForm from "./sub/edit-form-popup";

import {
  updateAbout,
  updateEmail,
  updateIsAvailable_Con,
  updateIsAvailable_Tm,
  updateLocation,
  updatePhone,
  updateSkills,
} from "../../slices/userReducer";
import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();

  const divider = <div className="divider" />;
  const id = useSelector((state) => state.user.userID);
  const inputRef = useRef("");

  const profilePicture = useSelector((state) => state.user.picture);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const fullName = `${firstName} ${lastName}`;
  const skills = useSelector((state) => state.user.skills);
  const phone = useSelector((state) => state.user.phone);
  const about = useSelector((state) => state.user.about);
  const location = useSelector((state) => state.user.location);
  const email = useSelector((state) => state.user.email);
  const isAvailableTM = useSelector((state) => state.user.isAvailable_Tm);
  const isAvailableCon = useSelector((state) => state.user.isAvailable_Con);

  const [isProfileImageHovered, setIsProfileImageHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("About");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/profile/get_user_info/${id}`
  //       );
  //       const data = await response.json();
  //       const info = data.userInfo.rows[0];
  //       //console.log(info);
  //       setFullName(info.firstname + " " + info.lastname);
  //       setEmail(info.email);
  //       setProfilePicture(info.picture);
  //       setSkills(info.skills);
  //       setIsAvailableTM(info.available_tm);
  //       setIsAvailableCon(info.available_con);
  //       setLocation(info.location);
  //       setPhone(info.phone);
  //       setAbout(info.about);
  //     } catch (error) {
  //       console.error("Error fetching Data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    dispatch(updateSkills(updatedSkills));
    removeSkillData(index + 1);
  };

  const handleAddSkill = (newSkill) => {
    dispatch(updateSkills([...skills, newSkill]));
    updateSkillData(newSkill);
  };
  const handleSetAbout = () => {
    dispatch(updateAbout(inputRef.current.value));
    updateAboutData(inputRef.current.value);
  };
  const handleEditedInfo = (editedData) => {
    const {
      isAvailableCon = false,
      isAvailableTM = false,
      email = "",
      location = "",
      phone = "",
    } = editedData;

    dispatch(updateEmail(email));
    dispatch(updatePhone(phone));
    dispatch(updateIsAvailable_Tm(isAvailableTM));
    dispatch(updateIsAvailable_Con(isAvailableCon));
    dispatch(updateLocation(location));

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
        `http://localhost:8080/profile/update_user_info/${id}`,
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
  const updateAboutData = async (newAbout) => {
    console.log(newAbout);
    try {
      const response = await fetch(
        `http://localhost:8080/profile/update_about/${id}`,
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
        `http://localhost:8080/profile/update_skills/${id}`,
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
        `http://localhost:8080/profile/remove_skill/${id}`,
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
                  handleEditedInfo(editedData);
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
        {/* <button className="message-button">Message</button> */}
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
                {isEditingAbout ? (
                  <>
                    <div className="edit-about-container">
                      <textarea
                        value={about}
                        onChange={(e) => dispatch(updateAbout(e.target.value))}
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
                    <div
                      className="edit-circle-container"
                      onClick={() => setIsEditingAbout(true)}
                    >
                      <FontAwesomeIcon icon={faPen} className="arrow-icon" />
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeSection === "Skills" && (
            <>
              <div className="skills">
                <div className="skill-buttons">
                  {
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
