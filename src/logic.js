import { stravaUserInfo } from "./stravaApi";

export function initializeApp() {
    console.log('App initialized with core logic.');
    stravaUserInfo(true);
    
  }