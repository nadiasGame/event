

const inputElem = document.querySelector('#order-number');
const buttonElem = document.querySelector('#searchButton');


// hämta hem server från backend
async function loggedIn() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/auth/Tokencheck', {
        method: '',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);

    if (data.success == false) {
        verifyElem.style.display = "none";
        buttonElem.style.display = "none"; 
        window.location.href = "http://localhost:4001/staff.html"

        
    }

}

async function getAccountInformation() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/account', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();

    console.log(data);
    emailElem.innerHTML = `E-post: ${data.email}`;

    if (data.role == 'admin') {
        getUserAccounts();
        showChangePassword();
    } else if (data.role == 'user') {
        showRemoveButton();
    }
}

    /* async function ticketNr(ticketNr) {
        const token = sessionStorage.getItem('token');
     
        const response = await fetch('http://localhost:4001/api/loggedin/verify', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            
        });
        const data = await response.json();
        console.log(data);
     
        if (data.success) {
            // Visar ordernummer och leveranstid (ETA);
            ticketNumberElem.innerHTML = `Ticketnummer: ${data.ticketNr}`;
            etaElem.innerHTML = `Leveranstid: ${data.eta} minuter`;
        }
     }
     //hämta hem klickad biljett från databasen
     */

    async function verify(){
           loggedIn();
        const ticket = inputElem.value;
        const token = sessionStorage.getItem('token');
        let response = await fetch("api/loggedin/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ticket: ticket,
            }),
           
          });
        const ticketdata = await response.json();
        
            console.log(data);
            if(data.success =true){
                alert('Verified ticket!')
            }
            else{
                alert('did not match ticket!')
            }
    }



  
  
  



  

loggedIn();
getAccountInformation();