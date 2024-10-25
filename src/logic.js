import { stravaUserInfo } from "./stravaApi";
import { manageData } from "./storage";

export function initializeApp() {
    console.log('App initialized with core logic.');
    stravaUserInfo(true);

  }

  // getting the data from Api call logic
  export function sortUserWorkouts(data) {
    let runData = [];
    let liftData = [];
    let otherSports = [];

    for (let i=0;i<data.length;i++) {
      if (data[i].type === 'Run') {
        runData.push(data[i]);
      } else if (data[i].type === 'WeightTraining') {
        liftData.push(data[i]);
      } else {
        otherSports.push(data[i]);
      }
    }
    console.log(runData);
    console.log(liftData);
    console.log(otherSports);
  }