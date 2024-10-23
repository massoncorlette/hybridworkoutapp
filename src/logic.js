import { stravaUserInfo } from "./stravaApi";

export function initializeApp() {
    console.log('App initialized with core logic.');
    stravaUserInfo(true);

  }

  // getting the data from Api call logic
  export function sortUserData(data) {
    console.log(data);

    let runData = [];
    let liftData = [];

    for (let i=0;i<data.length;i++) {
      if (data[i].type = 'Run') {
        runData.push(data[i]);
      } else if (data[i].type = 'WeightTraining') {
        liftData.push(data[i]);
      }
    }
    console.log(runData);
    console.log(liftData);
  }