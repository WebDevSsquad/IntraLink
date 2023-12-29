import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { v4 } from "uuid";
import { storage } from "../../../firebase";
import { updatePicture } from "../../../slices/userReducer";
import "./edit-form-popup.css";
const EditForm = ({
  email,
  phone,
  location,
  isAvailableTM,
  isAvailableCon,
  onSave,
}) => {
  const dispatch = useDispatch();
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedavailableTM, setIsAvailableTM] = useState(isAvailableTM);
  const [editedavailableCon, setIsAvailableCon] = useState(isAvailableCon);
  const [validPhone, setValidPhone] = useState(true);
  const [userImg, setUerImg] = useState("/assets/darkUser.svg"); //! the uploaded image
  const [userImgUpload, setUserImgUpload] = useState(null); //!the uploaded image in base64 format
  const user_id = useSelector((state) => state.user.userID);
  const picture = useSelector((state) => state.user.picture);
  const handleSave = () => {
    onSave({
      email: editedEmail,
      phone: editedPhone,
      location: editedLocation,
      isAvailableTM: editedavailableTM,
      isAvailableCon: editedavailableCon,
    });
    handelUploadImage();
  };
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[+\d]+$/;
    if (!regex.test(phoneNumber)) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
  };

  const deleteImage = (url) => {
    const nurl = new URL(url);
    const pathname = nurl.pathname; // This will be '/v0/b/intralink-df655.appspot.com/o/Users%20Images%2FGenryusai%20Shigekuni%20Yamamoto%2C%20Bleach%2C%20anime%2C%20warrior%2C%20art%2C%20720x1280%20wallpaper.jpg533b4ab2-78ae-4447-b629-6ef29dc3d12b'
    const imageName = decodeURIComponent(pathname.split("/o/")[1]).split(
      "?alt=media"
    )[0];
    console.log(imageName); // This will log 'Users Images/Genryusai Shigekuni Yamamoto, Bleach, anime, warrior, art, 720x1280 wallpaper.jpg533b4ab2-78ae-4447-b629-6ef29dc3d12b'
    const prevImageUrl = imageName;
    const prevImageRef = ref(storage, prevImageUrl); // get the reference from the url
    deleteObject(prevImageRef) // delete the image
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadPhoto = (
    <div className="img-container">
      <div className="img-file-container">
        <div className="img-container">
          <img src={userImg} alt="personal image" className="img" />
        </div>
        <div className="text">Upload photo</div>
        <input
          style={{ color: "red" }}
          type="file"
          className="file"
          onChange={(event) => {
            const reader = new FileReader();
            reader.onload = () => setUerImg(reader.result);
            if (event.target.files) {
              reader.readAsDataURL(event.target.files[0]);
              setUserImgUpload(event.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );

  const handelUploadImage = () => {
    if (userImgUpload) {
      const imageName = userImgUpload.name + v4();
      const imageRef = ref(storage, `Users Images/${imageName}`);
      uploadBytes(imageRef, userImgUpload)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              console.log(url);
              updateUserImage(url);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateUserImage = (url) => {
    const add = {
      image: url,
      user_id: user_id,
    };
    try {
      fetch("http://localhost:8080/auth/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(add),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error adding image`);
        }
        if (
          picture !== "/assets/darkUser.svg" &&
          picture !== "/assets/lightUser.svg"
        ) {
          deleteImage(picture);
        }
        dispatch(updatePicture(url));
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSave}>
      <h1>Edit Profile</h1>
      <div className="line"></div>
      {uploadPhoto}
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

EditForm.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isAvailableTM: PropTypes.bool.isRequired,
  isAvailableCon: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
};
