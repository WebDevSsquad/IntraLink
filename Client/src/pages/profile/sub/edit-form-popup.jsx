import React, { useState } from "react";
import Switch from "react-switch";
import "./edit-form-popup.css";

const EditForm = ({
  email,
  phone,
  location,
  isAvailableTM,
  isAvailableCon,
  onSave,
}) => {
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedavailableTM, setIsAvailableTM] = useState(isAvailableTM);
  const [editedavailableCon, setIsAvailableCon] = useState(isAvailableCon);

  const handleSave = () => {
    onSave({
      email: editedEmail,
      phone: editedPhone,
      location: editedLocation,
      isAvailableTM: editedavailableTM,
      isAvailableCon: editedavailableCon,
    });
  };

  return (
    <div className="edit-form">
      <h1>Edit Profile</h1>
      <div className="line"></div>

      <div className="input-wrapper">
        <label>Phone</label>
        <input
          type="text"
          value={editedPhone}
          onChange={(e) => setEditedPhone(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <label>Location</label>
        <input
          type="text"
          value={editedLocation}
          onChange={(e) => setEditedLocation(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <label>Email</label>
        <input
          type="text"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
      </div>

      <div className="toggle-box">
        <label>AvailableTM:</label>
        <Switch
          checked={editedavailableTM}
          onChange={() => setIsAvailableTM(!editedavailableTM)}
          onColor="#4CAF50"
        />
      </div>

      <div className="toggle-box">
        <label>AvailableCon:</label>
        <Switch
          checked={editedavailableCon}
          onChange={() => setIsAvailableCon(!editedavailableCon)}
          onColor="#4CAF50"
        />
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditForm;
