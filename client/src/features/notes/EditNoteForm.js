import React, { useState, useEffect } from "react";
import { useUpdateNoteMutation } from "./notesApiSlice";
import { useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteNoteMutation();

  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.text);
  const [noteStatus, setNoteStatus] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  const onUserIdChanged = (e) => {
    // console.log(e.target.value, note.user, userId);
    setUserId(e.target.value);
  };

  const onNoteTitleChanged = (e) => setNoteTitle(e.target.value);
  const onNoteTextChanged = (e) => setNoteText(e.target.value);

  const onNoteStatusChanged = (e) => {
    setNoteStatus(!noteStatus);
  };

  const onSaveNoteClicked = async (e) => {
    const updatedAt = new Date();
    await updateNote({
      id: note.id,
      title: noteTitle,
      text: noteText,
      completed: noteStatus,
      user: userId,
      updatedAt,
    });
  };

  const onDeleteNoteClicked = async (e) => {
    await deleteNote({ id: note.id });
  };

  const options = users.map((user) => {
    return (
      <option key={user._id} value={user.id}>
        {user.username}
      </option>
    );
  });

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setNoteTitle("");
      setNoteText("");
      setNoteStatus(false);
      navigate("/dash/notes");
    }
  }, [isSuccess, isDeleteSuccess, navigate]);

  let canSave = !isLoading;

  const errClass = isError || isDeleteError ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || deleteError?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="detele"
        onClick={onDeleteNoteClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }
  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()} className="form">
        <div className="form__title-row">
          <h2>Edit Note</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label htmlFor="title" className="form__label">
          Title:
        </label>
        <input
          type="text"
          className="form__input"
          id="title"
          name="title"
          autoComplete="off"
          value={noteTitle}
          onChange={onNoteTitleChanged}
        />
        <label htmlFor="text" className="form__label">
          Text:
        </label>
        <input
          type="text"
          className="form__input"
          id="text"
          name="text"
          autoComplete="off"
          value={noteText}
          onChange={onNoteTextChanged}
        />
        <label
          htmlFor="note-status"
          className="form__label form__checkbox-container"
        >
          COMPLETED:
          <input
            type="checkbox"
            id="note-status"
            name="note-status"
            className="form__checkbox"
            checked={noteStatus}
            onChange={onNoteStatusChanged}
          />
        </label>
        <label htmlFor="owner" className="form__label">
          NOTE OWNER:
        </label>
        <select
          name="owner"
          id="owner"
          className={`form__select`}
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;
