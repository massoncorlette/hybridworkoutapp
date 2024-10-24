import { sortUserData } from "./logic";
// will have to figure logic for external users, involving node.js backend security
// for now have my own values to use

export let stravaUserInfo = function(load) {
  const clientId = "117917";
  const clientSecret = "a830f572e6291e2f35635914b6a682eecbda64c1";
  const redirectUri = "http://localhost:9000/"; // Change this when going live 
  const scope = "activity:read_all"; // The scopes define what data you want access to
  const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}`;
  
  // get access token for each instance user logs in
  async function exchangeToken(authCode) {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: authCode,
        grant_type: "authorization_code"
      })
    });
  
    const data = await response.json();
    if (data.access_token) {
      console.log("Access Token:", data.access_token);
      const accessToken = data.access_token;
      
      let activityType = 'all';
      
      queryForData(accessToken,activityType);
      // Save or use the access token as needed
    } else {
      console.error("Failed to get access token:", data);
    }
  }

  // dealing with Promise object
  async function queryForData(accessToken,activitesType) { 
    try {
      if (activitesType === 'all') {
        const athleteData = await getAllStravaActivities(accessToken);
        sortUserData(athleteData);
      }
    } catch(error) {
      console.log(error);
    }
  }
  
  // return Promise object
  async function getStravaActivities(token) {
    try {
      const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }

  // return Promise object
  async function getAllStravaActivities(token) {
    let allActivities = [];
    let page = 1;
    let perPage = 200; 
  
    while (true) {
      try {
        const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (data.length === 0) {
          break;
        }
        allActivities = allActivities.concat(data);
        page++;
  
      } catch (error) {
        console.error('Error fetching activities:', error);
        break;
      }
    }
  
    console.log('All Activities:', allActivities);
    return allActivities;
  }
  // if load true, means user login or signup
  if (load) {
    // maybe have a user login page, this listener as the entry point ?
    document.addEventListener('DOMContentLoaded', () => {
      const loginButton = document.getElementById('stravaLoginBtn');
      if (loginButton) {
        loginButton.addEventListener('click', () => {
          window.location.href = stravaAuthUrl;
        });
      } else {
        console.error("Strava login button not found in the DOM.");
      }
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      
      if (authorizationCode) {
        exchangeToken(authorizationCode);
      }
    });
  
  }
  
  return {
    exchangeToken:exchangeToken,
    getStravaActivities:getStravaActivities,
    getAllStravaActivities:getAllStravaActivities,
    clientId,
    clientSecret, // returning this is a security risk ..for now
    redirectUri,
    scope
  }

}





  
