
// will have to figure logic for external users, involving node.js backend security
// for now have my own values to use
const clientId = "117917";
const clientSecret = "a830f572e6291e2f35635914b6a682eecbda64c1";
const redirectUri = "http://localhost:3000/exchange_token"; // Change this when going live 
const scope = "read,activity:read_all"; // The scopes define what data you want access to
const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;


// maybe have a user login page, this listener as the entry point ?
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('stravaLoginBtn').addEventListener('click', () => {
    // Redirect user to Strava's OAuth page
    window.location.href = stravaAuthUrl;
  });
});

const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');

if (authorizationCode) {
  exchangeToken(authorizationCode);
}

// 
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
    // Save or use the access token as needed
  } else {
    console.error("Failed to get access token:", data);
  }
}


// get Promise object
export async function getStravaActivities(token) {
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




  
