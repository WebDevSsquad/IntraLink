import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./notifications.css";

const Notification = ({ notification, onAccept }) => {
  const pictureUrl = notification.sender_user_image;
  console.log(notification);
  const dateObject = new Date(notification.date);
  const divider = <div className="divider" />;
  dateObject.setDate(dateObject.getDate() + 1);
  // Get the date in the format "YYYY-MM-DD"
  const extractedDate = dateObject.toISOString().substring(0, 10);

  return (
    <div className="notification-container">
      <img
        src={pictureUrl}
        alt={`Profile of ${notification.sender_username}`}
        className="profile-picture"
      />
      <div className="notification-details">
        <h2 className="notification-text">{notification.type}</h2>
        {divider}
        <h3 className="sender-name">
          Sender Username: {notification.sender_username}
        </h3>
        <p className="project-name">{notification.projectname}</p>
        <p className="notification-text">{notification.description}</p>
        <p className="notification-text">{extractedDate}</p>
        <button className="accept-button" onClick={onAccept}>
          Accept
        </button>
      </div>
    </div>
  );
};

const Notifications = () => {
  const user_id = useSelector((state) => state.user.userID);

  const [Notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/notifications/getNotifications/${user_id}`
        );
        const data = await response.json();
        console.log(data);
        const notifs = data.notifications.rows;
        setNotifications(notifs);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccept = (index) => {
    const updatedNotifications = [...Notifications];
    removeNotification(
      Notifications[index].sender_id,
      Notifications[index].receiver_id,
      Notifications[index].project_id
    );
    console.log(Notifications);
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  const removeNotification = async (sender, receiver, project) => {
    try {
      const response = await fetch(
        `http://localhost:8080/notifications/removeNotification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: sender,
            receiver: receiver,
            project: project,
          }),
        }
      );

      const update = await response.json();
      console.log(update);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="notification-page-container">
      <h2 className="page-title">Notifications</h2>
      {console.log(Notifications)}
      {Notifications !== null &&
        Notifications.map((notification, index) => (
          <Notification
            key={index}
            notification={notification}
            onAccept={() => handleAccept(index)}
          />
        ))}
    </div>
  );
};

export default Notifications;
