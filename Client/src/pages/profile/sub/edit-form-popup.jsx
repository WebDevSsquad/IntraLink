import React, { useState, useRef } from "react";
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
  const [validPhone, setValidPhone] = useState(true);

  const handleSave = () => {
    onSave({
      email: editedEmail,
      phone: editedPhone,
      location: editedLocation,
      isAvailableTM: editedavailableTM,
      isAvailableCon: editedavailableCon,
    });
  };
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[+\d]+$/;
    if (!regex.test(phoneNumber)) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSave}>
      <h1>Edit Profile</h1>
      <div className="line"></div>

      <div className="input-wrapper">
        <label>Phone</label>
        <input
          type="tel"
          value={editedPhone}
          onChange={(e) => {
            setEditedPhone(e.target.value);
            validatePhoneNumber(e.target.value);
          }}
        />
      </div>

      {!validPhone && <label className="invalid">enter a valid phone</label>}

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
          type="email"
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

      {validPhone ? (
        <input className="save" type="submit" value="Save" />
      ) : (
        <input className="save" disabled type="submit" value="Save" />
      )}
    </form>
  );
};

export default EditForm;
