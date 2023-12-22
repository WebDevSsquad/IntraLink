import { useForm } from "@formspree/react";
import { useState } from "react";
import greencheck from "../../../../assets/check_submit.svg";
import "./contact.css";
export default function Contact() {
  const [state, handleSubmit] = useForm("xqkrzglb");
  const [succeeded, setSucceeded] = useState(false);

  const curve = (
    <div className="custom-shape-divider-top-1703246710">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></path>
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
      />
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

  const lastName = (
    <div className="input-box lastName">
      <input
        type="text"
        className="input-control"
        name="Name"
        id="name"
        required
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
      />
      <label htmlFor="name" className="label-control">
        First Name
      </label>
    </div>
  );
  const phoneNumber = (
    <div className="input-box phone">
      <input
        type="phone"
        className="input-control"
        name="Phone"
        id="phone"
        required
      />
      <label htmlFor="email" className="label-control">
        Phone
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 512 512"
      >
        <path d="M347.1 24.6c7.7-18.6 28-28.5 47.4-23.2l88 24C499.9 30.2 512 46 512 64c0 247.4-200.6 448-448 448c-18 0-33.8-12.1-38.6-29.5l-24-88c-5.3-19.4 4.6-39.7 23.2-47.4l96-40c16.3-6.8 35.2-2.1 46.3 11.6L207.3 368c70.4-33.3 127.4-90.3 160.7-160.7L318.7 167c-13.7-11.2-18.4-30-11.6-46.3l40-96z" />
      </svg>
    </div>
  );
  const elements = [firstName, lastName, email, phoneNumber];

  console.log(state);
  const form = (
    <>
      <div className="contact" id="contact">
        {curve}
        <div className="contact-form-container">
          <div className="contact-form home_contact">
            <form
              autoComplete="on"
              onSubmit={(e) => {
                handleSubmit(e).then(() => {
                  if (state.succeeded) {
                    setSucceeded(true);
                    setTimeout(() => {
                      setSucceeded(false);
                    }, 3000);
                  }
                });
              }}
              className="form"
              method="POST"
            >
              {elements}
              <div className="message_area">
                <label className="message">Message</label>
                <textarea name="Message"></textarea>
              </div>
              <div className={`submit-container home_send `}>
                <button
                  type="submit"
                  className={`send ${succeeded ? "success" : ""}`}
                  disabled={state.submitting}
                >
                  <span  className={` ${succeeded && "vanish"}`}>Send</span>
                  <img
                    src={greencheck}
                    alt="check"
                    className={`${succeeded ? "check_img" : "vanish"}`}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return form;
}
