import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./add-skill.css";

const AddSkillButton = ({ onAddSkill }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const inputRef = useRef(null);
  const skills = useSelector((state) => state.user.initialSkills);
  useEffect(() => {
    if (isModalOpen) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleAddSkill = () => {
    onAddSkill(newSkill);
    setNewSkill("");
    setModalOpen(false);
  };

  const handleCancelSkill = () => {
    setNewSkill("");
    setModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    } else if (e.key === "Escape") {
      handleCancelSkill();
    }
  };

  return (
    <div className="add-skill-button skill-button">
      <FontAwesomeIcon
        icon={faPlus}
        className="plus-icon"
        onClick={() => setModalOpen(true)}
      />
      {isModalOpen && (
        <div className="add-skill-modal-overlay">
          <div className="add-skill-modal">
            <div className="modal-header">
              <h2>Add Skill</h2>
              <hr />
            </div>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              className="add-skill-input"
              autoFocus
            />
            <div className="add-skill-buttons">
              <button
                onClick={handleAddSkill}
                className="add-skill-done-button"
              >
                Done
              </button>
              <button
                onClick={handleCancelSkill}
                className="add-skill-cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSkillButton;
