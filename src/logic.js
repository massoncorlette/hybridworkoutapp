import { stravaUserInfo } from "./stravaApi";

export function initializeApp() {
    console.log('App initialized with core logic.');
    stravaUserInfo(true);

  }

  // getting the data from Api call logic
  export function sortUserData(data) {
    console.log(data);
    let allAthleteData = data;


    console.log(allAthleteData);
  }