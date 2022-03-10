
const usernameLogin = document.querySelector('#username-login');
const passwordLogin = document.querySelector('#password-login');
const loginButton = document.querySelector('#login-button');





async function login(credentials) {
  const response = await fetch('http://localhost:4001/api/event/staff', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers:{
          
          'Content-Type': 'application/json'
      }
  });
  const data = await response.json();
  console.log(data);
  if (data.success) {
     
      saveToken(data.token); 
      window.location.href = 'http://localhost:4001/loggedin.html';
  }
}


function saveToken(token) {
  sessionStorage.setItem('token', token); 
}


loginButton.addEventListener('click', () => {
  const credentials = {
      username: usernameLogin.value,
      password: passwordLogin.value
  }

  login(credentials);
});


