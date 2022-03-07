
const usernameLogin = document.querySelector('#username-login');
const passwordLogin = document.querySelector('#password-login');
const loginButton = document.querySelector('#login-button');



async function getTicket(){
  const response = await fetch('http://localhost:4001/api/ticket', {
              method: 'GET',
          });
          const data = await response.json();
          console.log(data);
      if (data){
          showTicket(data)
      }
}


async function createTicket() {  //här gör vi om "event" från rad 16 till "ticket" men det är samma sak.
  urlId = new URLSearchParams(window.location.search).get("id");
  const response = await fetch("http://localhost:4001/api/event/buy" + urlId);


  const data = await response.json();
      console.log(data);
     if (data) {
         showTicket(data);
     }

}


createTicket();



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
      // Spara token i sessionStorage
      // Redirecta till http://localhost:5000/loggedIn.html
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


