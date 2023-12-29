import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "./availabilityboard.css";
import ComboBox from "../home/sub/feed/sub/combobox/combobox";

const availabilityboard = () => {
  const [filteredData1, setfilteredData1] = useState(null);

  const [filteredData2, setfilteredData2] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [invitationDescription, setInvitationDescription] = useState("");

  const [datatoshow, setdatatoshow] = useState(null);

  const [isdatageted, setisdatageted] = useState(false);

  const [invitedID, setInvitedId] = useState(false);

  const selectedProject = useSelector((state) => state.feed.selectedProject);

  const logged_id = useSelector((state) => state.user.userID);

  const navigate = useNavigate();

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("blur");
    } else {
      document.body.classList.remove("blur");
    }
  }, [isPopupOpen]);

  useEffect(() => {
    fetch(`http://localhost:8080/availability/availabilitytoget`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setdatatoshow(data.ans.filter((item) => item.available_con));
        setfilteredData1(data.ans.filter((item) => item.available_con));
        setfilteredData2(data.ans.filter((item) => item.available_tm));
        setisdatageted(true);
      });
  }, []);

  const buttonref1 = useRef(null);
  const buttonref2 = useRef(null);

  const handleclick1 = () => {
    setdatatoshow(filteredData1);
    buttonref1.current.style.backgroundColor = "var(--primary-100)";
    buttonref2.current.style.backgroundColor = "var(--primary-200)";
  };

  const handleInvite = (receiver, description) => {
    let startdate = new Date();
    addInvitationData(receiver, description, startdate);
  };
  const addInvitationData = async (receiver, description, startdate) => {
    try {
      const response = await fetch(
        `http://localhost:8080/availability/sendInvitation/${logged_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: receiver,
            description: description,
            selectedProject: selectedProject,
            date: startdate,
          }),
        }
      );

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error("Error inviting user:", error);
    }
  };
  const handleclick2 = () => {
    setdatatoshow(filteredData2);
    buttonref1.current.style.backgroundColor = "var(--primary-200)";
    buttonref2.current.style.backgroundColor = "var(--primary-100)";
  };

  return (
    <div className={`fullDimensions ${isPopupOpen ? "popup-overlay" : ""}`}>
      <div className="availability_main">
        <div className="centered-ava-container">
          <div className="ava-content">
            <div className="buttons-ava-container">
              <button
                className="b1"
                onClick={() => {
                  isdatageted && handleclick1();
                }}
                ref={buttonref1}
              >
                Available Contributors
              </button>
              <button
                onClick={() => {
                  isdatageted && handleclick2();
                }}
                ref={buttonref2}
              >
                Available Task Managers
              </button>
              <Popup
                open={isPopupOpen}
                closeOnDocumentClick
                onClose={() => {
                  setIsPopupOpen(false);
                  setInvitationDescription("");
                }}
              >
                <div className="popup-content larger-popup">
                  <h2 className="invitation-title">Invite User</h2>
                  <ComboBox />
                  <textarea
                    value={invitationDescription}
                    onChange={(e) => setInvitationDescription(e.target.value)}
                    className="edit-textarea"
                    autoFocus
                    onFocus={(e) => {
                      let tempValue = e.target.value;
                      e.target.value = "";
                      e.target.value = tempValue;
                    }}
                  />
                  <div className="popup-buttons">
                    <button
                      className="popup-button"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="popup-button"
                      onClick={() => {
                        setIsPopupOpen(false);
                        handleInvite(invitedID, invitationDescription);
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </Popup>
            </div>
            {isdatageted &&
              datatoshow.map((dat) => (
                <div className="ava-users" key={dat.user_id}>
                  <div className="username">
                    <p onClick={() => navigate(`/profile/${dat.user_id}`)}>
                      {dat.username}
                    </p>
                  </div>
                  <div className="useremail">
                    <p>{dat.email}</p>
                  </div>
                  {/* <div className="userrank">
                        <p>Rank: {dat.rank}</p>
                    </div> */}
                  <button
                    className="buttontoreq"
                    onClick={() => {
                      setInvitedId(dat.user_id);
                      setIsPopupOpen(true);
                    }}
                  >
                    {" "}
                    Invite{" "}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default availabilityboard;