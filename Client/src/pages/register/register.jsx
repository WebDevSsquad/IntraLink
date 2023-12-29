import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateAbout,
  updateEmail,
  updateExpires,
  updateFirstName,
  updateIsAvailable_Con,
  updateIsAvailable_Tm,
  updateLastName,
  updateLocation,
  updateLoggedIn,
  updatePhone,
  updatePicture,
  updateSkills,
  updateUserID,
  updateUserName,
} from "../../slices/userReducer";
import "./register.css";

export default function Register() {
  const dispatch = useDispatch();

  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [SeePassword, setSeePassword] = useState(false);
  const [SeeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const [dontMatch, setDontMatch] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [EmailTaken, setEmailTaken] = useState(false);
  const [UserNameTaken, setUserNameTaken] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const UserNameRef = useRef();
  const ConfirmPasswordRef = useRef();

  const navigate = useNavigate();
  const theme = useSelector((state) => state.user.theme);

  const onSubmit = () => {
    if (ConfirmPassword !== Password && location.pathname === "/signup") {
      setDontMatch(true);
      if (ConfirmPasswordRef.current) {
        ConfirmPasswordRef.current.value = "";
        ConfirmPasswordRef.current.style.borderBottomColor = "red";
      }
      return;
    }
    setDontMatch(false);
    dispatch(updatePicture(`/assets/${theme}User.svg`));

    let ok = false;
    let status = 200;

    const url = `http://localhost:8080/auth${location.pathname}`;

    const login = {
      username: UserName,
      password: Password,
    };

    const signup = {
      image: `/assets/${theme}User.svg`,
      username: UserName,
      firstname: FirstName,
      lastname: LastName,
      email: Email,
      password: Password,
    };
    if (location.pathname === "/signup") {
      dispatch(updateUserName(UserName));
      dispatch(updateFirstName(FirstName));
      dispatch(updateLastName(LastName));
      dispatch(updateEmail(Email));
    }
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        location.pathname === "/login" || location.pathname === "/logIn"
          ? login
          : signup
      ),
    })
      .then((res) => {
        ok = res.ok;
        status = res.status;
        return res.json();
      })
      .then((data) => {
        if (ok) {
          // ----------------------------Get userData----------------------------------
          if (data.user.picture !== undefined)
            dispatch(updatePicture(data.user.picture));
          if (data.user.firstname !== undefined)
            dispatch(updateFirstName(data.user.firstname));
          if (data.user.lastname !== undefined)
            dispatch(updateLastName(data.user.lastname));
          if (data.user.user_id !== undefined)
            dispatch(updateUserID(data.user.user_id));
          if (data.user.username !== undefined)
            dispatch(updateUserName(data.user.username));
          if (data.user.email !== undefined)
            dispatch(updateEmail(data.user.email));
          if (data.user.available_con !== undefined)
            dispatch(updateIsAvailable_Con(data.user.available_con));
          if (data.user.available_tm !== undefined)
            dispatch(updateIsAvailable_Tm(data.user.available_tm));
          if (data.user.location !== undefined)
            dispatch(updateLocation(data.user.location));
          if (data.user.phone !== undefined)
            dispatch(updatePhone(data.user.phone));
          if (data.user.about !== undefined)
            dispatch(updateAbout(data.user.about));
          if (data.user.skills !== undefined)
            dispatch(updateSkills(data.user.skills));
          console.log(data.user);
          // ---------------------------------------------------------------------------
          localStorage.setItem("token", data.token);

          setTimeout(() => {
            dispatch(updateExpires(true));
          }, 60 * 60 * 1000 * 2);

          dispatch(updateLoggedIn(true));

          navigate("/profile");

          setWrongEmail(false);

          setWrongPassword(false);

          setUserNameTaken(false);

          setEmailTaken(false);

          if (EmailRef.current)
            EmailRef.current.style.borderBottomColor = "white";
          if (PasswordRef.current)
            PasswordRef.current.style.borderBottomColor = "white";
          if (PasswordRef.current)
            PasswordRef.current.style.borderBottomColor = "white";
        } else if (status === 422) {
          alert(data[0].message);
        } else {
          if (data.error === "Invalid email") {
            if (UserNameRef.current) {
              UserNameRef.current.value = "";
              UserNameRef.current.style.borderBottomColor = "red";
            }
            setWrongEmail(true);
          }
          if (data.error === "Invalid password") {
            if (PasswordRef.current) {
              PasswordRef.current.value = "";
              PasswordRef.current.style.borderBottomColor = "red";
            }
            setWrongPassword(true);
            setWrongEmail(false);
            if (EmailRef.current)
              EmailRef.current.style.borderBottomColor = "white";
          }
          if (data.error === "Email is already taken") {
            setEmailTaken(true);
            if (EmailRef.current) {
              EmailRef.current.value = "";
              EmailRef.current.style.borderBottomColor = "red";
            }
          }
          if (data.error === "Username is already taken") {
            setUserNameTaken(true);
            if (UserNameRef.current) {
              UserNameRef.current.value = "";
              UserNameRef.current.style.borderBottomColor = "red";
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const username = (
    <div
      className={
        location.pathname === "/signup"
          ? "input-box"
          : "input-box username_login"
      }
    >
      <input
        type="text"
        className="input-control"
        name="Name"
        id="name"
        ref={UserNameRef}
        required
        onChange={(e) => setUserName(e.target.value)}
      />
      {UserNameTaken && <div className="wrong">UserName is already taken</div>}
      <label htmlFor="name" className="label-control">
        Username
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  const email = (
    <div className="input-box email">
      <input
        type="email"
        className="input-control"
        name="Email"
        id="email"
        required
        ref={EmailRef}
        onChange={(e) => setEmail(e.target.value)}
      />
      {(wrongEmail && (
        // eslint-disable-next-line react/no-unescaped-entities
        <div className="wrong">Email doesn't exist please try again</div>
      )) ||
        (EmailTaken && <div className="wrong">Email is already taken</div>)}
      <label htmlFor="email" className="label-control">
        Email
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    </div>
  );
  const lock = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
        clipRule="evenodd"
      />
    </svg>
  );
  const eye = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="18"
      viewBox="0 0 576 512"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
      />
    </svg>
  );
  const eyeSlash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="20"
      viewBox="0 0 640 512"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
      />
    </svg>
  );

  const password = (
    <div
      className={
        location.pathname === "/signup"
          ? "input-box"
          : "input-box password_login"
      }
    >
      <input
        type={SeePassword ? "text" : "password"}
        className="input-control"
        name="Password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        ref={PasswordRef}
      />
      {wrongPassword && (
        <div className="wrong">Wrong password please try again</div>
      )}
      <label htmlFor="password" className="label-control">
        Password
      </label>
      <div className="eye" onClick={() => setSeePassword(!SeePassword)}>
        {Password === "" ? lock : SeePassword ? eyeSlash : eye}
      </div>
    </div>
  );

  const confirmPassword = (
    <div className="input-box confirmPassword">
      <input
        type={SeeConfirmPassword ? "text" : "password"}
        className="input-control"
        name="confirmPassword"
        id="confirmPassword"
        required
        ref={ConfirmPasswordRef}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {dontMatch && <div className="wrong">Passwords do not match</div>}
      <label htmlFor="confirmPassword" className="label-control">
        Confirm Password
      </label>
      <div
        className="eye"
        onClick={() => setSeeConfirmPassword(!SeeConfirmPassword)}
      >
        {ConfirmPassword === "" ? lock : SeeConfirmPassword ? eyeSlash : eye}
      </div>
    </div>
  );

  const lastName = (
    <div className="input-box lastName">
      <input
        type="text"
        className="input-control"
        name="Name"
        id="name"
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="name" className="label-control">
        Last Name
      </label>
    </div>
  );

  const firstName = (
    <div className="input-box firstName">
      <input
        type="text"
        className="input-control"
        name="Name"
        id="name"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="name" className="label-control">
        First Name
      </label>
    </div>
  );

  const elements = [
    username,
    location.pathname === "/signup" && email,
    location.pathname === "/signup" && firstName,
    location.pathname === "/signup" && lastName,
    password,
    location.pathname === "/signup" && confirmPassword,
  ];

  const signup = (
    <p className="noAccount">
      {`Don't have an account? `}
      <Link to="/signup">
        <span className="register">Sign Up</span>
      </Link>
    </p>
  );

  const form = (
    <>
      <div className="contact-form-container">
        <div className="contact-form">
          <form
            encType="multipart/form-data"
            autoComplete="on"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
              return false;
            }}
            className={location.pathname === "/signup" ? "form" : "form_login"}
          >
            {elements}
            <div className="submit-container">
              <input
                type="submit"
                value={location.pathname === "/signup" ? "Sign Up" : "Log In"}
                className="submit"
              />
              {location.pathname !== "/signup" && signup}
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return form;
}
