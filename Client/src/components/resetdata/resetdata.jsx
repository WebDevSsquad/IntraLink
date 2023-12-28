import {
  updateAbout,
  updateEmail,
  updateExpires,
  updateFetch,
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

export const ResetData = (dispatch) => {
  /// All the setters functions I am gonna need
  dispatch(updatePicture(`/assets/lightUser.svg`));

  dispatch(updateFirstName(""));

  dispatch(updateLastName(""));

  dispatch(updateUserID(""));

  dispatch(updateUserName(""));

  dispatch(updateEmail(""));

  dispatch(updateIsAvailable_Con(false));

  dispatch(updateIsAvailable_Tm(false));

  dispatch(updateLocation(""));

  dispatch(updatePhone(""));

  dispatch(updateAbout(""));

  dispatch(updateSkills([]));

  dispatch(updateLoggedIn(false));

  dispatch(updateExpires(true));

  dispatch(updateFetch(false));
};
