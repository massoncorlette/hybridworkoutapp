import { sortUserWorkouts } from "./logic";
// will have to figure logic for external users, involving node.js backend security
// for now have my own values to use
// May need 'cors' mode for api calls for security????

export let stravaUserInfo = function(load) {
  const clientId = "117917";
  let athleteId = null;
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
      
      const athleteProfile = await getAthleteProfile(accessToken);
      athleteId = athleteProfile.id;
            
      let activityType = 'all';
      
      queryForData(accessToken,activityType);
    } else {
      console.error("Failed to get access token:", data);
    }
  }

  // dealing with Promise object
  async function queryForData(accessToken,activitesType) { 
    try {
      if (activitesType === 'all') {
        const athleteData = await getAllStravaActivities(accessToken);
        const athleteStats = await getAthleteStats(accessToken);
        const athleteSegs = await getSegments(accessToken);

        sortUserWorkouts(athleteData);
        console.log(athleteStats);
        console.log(athleteSegs);
        
      }
    } catch(error) {
      console.log(error);
    }
  }

  // async functions all returning promise Objects
  async function getAthleteProfile(token) {
    const response = await fetch('https://www.strava.com/api/v3/athlete', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    const profile = await response.json();
    console.log("Athlete Profile:", profile);
    return profile; 
  }

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

  async function getAthleteStats(token) {
    
    const response = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const stats = await response.json();
    return stats;
  }  

  // recent workout data + totals
  async function getSegments(token) {
    
    const response = await fetch('https://www.strava.com/api/v3/segments/starred', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const segments = await response.json();
    return segments;
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
    getAthleteProfile:getAthleteProfile,
    getStravaActivities:getStravaActivities,
    getAllStravaActivities:getAllStravaActivities,
    getAthleteStats:getAthleteStats,
    getSegments:getSegments,
    clientId,
    clientSecret, // returning this is a security risk ..for now
    redirectUri,
    scope
  }
}





  
