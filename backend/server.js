
const express = require("express");//laddar in express jwt
const app = express();
const jwt = require("jsonwebtoken");


//hämtsa ifrån databasen
const {getEvent,saveEvent,saveTicket,getEventById,getAccountByUsername,getTicketNr} = require ('./database/operations');
const {generateTicketNr} = require ('./utils/ticket');
const { hashPassword, comparePassword } = require('./utils/bcrypt');
const { generateETA } = require('./utils/ticket');

/* const { hashPassword, comparePassword } = require('./utils/bcrypt');  */

//createOrderContainer();
//saveEvent();

app.use (express.static('../frontend'));//kopplar ihop backend med frontend
app.use (express.json());


// hämta eventet i databasen

app.post('/api/verify', async (request, response) => {
    const ticketNr = String(request.body.ticket); // exempel: {ticket: '1234' } ticket/biljett nummer
    const tickets = await getTicketNr(); //hämtas från operation.js via databasen. tickets är alla våra tickets i databasen. 
  
    console.log(ticketNr, 'ticket-number');
  
    for(i = 0; i < tickets.length; i++ ){ 
  
      if(tickets[i].ticket!=undefined){
        const match = await comparePassword(ticketNr, tickets[i].ticket ) 
      if(match == true){
        response.json({success: true })
        return;
      }
      }
      
     }
  
    response.json({success: false })
        
  
  });




app.post('/api/staff/create', async (request, response) => {
    const credentials = request.body;
    //{ username: 'ada', password: 'pwd123' }
    const resObj = {
        success: true,
        usernameExists: false
    }

    const usernameExists = await getAccountByUsername(credentials.username);

    if(usernameExists.length > 0) {
        resObj.usernameExists = true;
        resObj.success = false;
    }

    if (resObj.usernameExists == false) {
        const hashedPassword = await hashPassword(credentials.password);
        credentials.password = hashedPassword;

        saveAccount(credentials);
    }

    response.json(resObj);
});

app.post('/api/loggedin', async (request, response) => {
    const credentials = request.body;
    //{ username: 'ada', password: 'pwd123' }

    const resObj = {
        success: true,
        token: ''
    }
    const account = await getAccountByUsername(credentials.username);
    console.log(account);

    if (account.length > 0) {
        const correctPassword = await comparePassword(credentials.password, account[0].password);
        if (correctPassword) {
            resObj.success = true;

            // Vår token blir krypterad med vårt användarnamn som kopplar token till en användare
            const token = jwt.sign({ username: account[0].username }, 'a1b1c1', {
                expiresIn: 600 // Går ut om 10 min (värdet är i sekunder)
            });

            resObj.token = token;
        }
    }
    response.json(resObj);
});

app.get('/api/event', async (_request, response) =>{


    const resObj={
    success: true,
    event: ''
}
const eventEvent = await getEvent();





resObj.event = eventEvent;

response.json(resObj);

console.log(resObj);
});

app.post('/api/event/buy', (request, response) => {
    const ticket = request.body;
    
    // Hämta ut beställningen från body
    console.log("är det dena vi loggar ", JSON.stringify(ticket)); //Kolla i terminalen för att se hur beställningen ser ut

    const resObj = {
        success: true,
        ticket: ''

    };

        //order.id = data.id; // Kopplar samman beställningen med användarnamnet från JWT som skickades med i anropet

       // Spara beställningen till databasen


        resObj.success = true;
        resObj.ticketNr = generateTicketNr();

        resObj.ticketNr = generateETA();
        //resObj.event = getEvent();

    response.json(resObj);
    const b = resObj.ticketNr;
    const retval = `${b}`;
    const order = ticket;
    JSON.stringify(retval);
    JSON.stringify(order);
      saveTicket(retval,order);
    console.log("retval: ", retval);
    console.log("är det order", resObj.ticketNr);
  

});





app.listen ( 4001 ,()=>{
    console.log('started4001');
});
