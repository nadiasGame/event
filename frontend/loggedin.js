

const inputElem = document.querySelector('#verify-ticket');
const buttonElem = document.querySelector('#verify-button');


async function loggedIn() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/auth/tokenCheck', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    
    });
    console.log(token);


    const data = await response.json();
    console.log( 'Vad är detta?(tokenCheck)', data);

    if (data.success == false) {
        inputElem.style.display = "none";
        buttonElem.style.display = "none"; 
        window.location.href = "http://localhost:4001/staff.html"

    }
}


async function getTicketNr(){
    const response = await fetch('http://localhost:4001/api/ticket', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
        if (data){
            checkTicket(data)
        }
  }

    async function verify(){
      
    
        const ticketVerify = await fetch('http://localhost:4001/api/ticket', {
            method: 'GET',
        });

       
           
            const ticketData = await ticketVerify.json();
            console.log(ticketData); 

    const ticket = inputElem.value;
    let response = await fetch("/api/loggedin/verify", {
      
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
            ticket: ticket,
        }),
    });
    const data =await response.json()
         
            if(data.success =true){
                alert('Verified ticket!')
            }
            else{
                alert('did not match ticket!')
            }
    }

    buttonElem.addEventListener('click', () =>{
        verify();
    });

loggedIn();

  



  


