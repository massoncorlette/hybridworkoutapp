



export function setupDOM() {
    console.log('Setting up the DOM...');
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = '<h2>Welcome to my project!</h2>';
    }
    // additional DOM ...

  }