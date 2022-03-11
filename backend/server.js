
const express = require("express");//laddar in express jwt
const app = express();
const jwt = require("jsonwebtoken");


//hämtsa ifrån databasen
const {checkTicket,getEvent,saveEvent,saveTicket,getEventById,getAccountByUsername,getTicketNr} = require ('./database/operations');
const {generateTicketNr} = require ('./utils/ticket');
const { hashPassword, comparePassword } = require('./utils/bcrypt');
const { generateETA } = require('./utils/ticket');
const { response } = require("express");

/* const { hashPassword, comparePassword } = require('./utils/bcrypt');  */

//createOrderContainer();
//saveEvent();


app.use (express.static('../frontend'));//kopplar ihop backend med frontend
app.use (express.json());


app.get('/api/auth/tokenCheck', async (request, response) => {
    const token = request.headers.authorization.replace('Bearer ', '');
    const resObj = {
        success: false,

    }

    try {
        const data = jwt.verify(token, 'a1b1c1'); // Verifera vår token


        resObj.success = true;

    } catch (error) {
        resObj.errorMessage = 'Token invalid';
    }
    console.log(resObj);
    response.json(resObj);
})



app.post('/api/loggedin/verify', async (request, response) => {
    const ticketNr = String(request.body.ticket); // exempel: {ticket: '1234' } ticket/biljett nummer
    const tickets = await getTicketNr(); //hämtas från operation.js via databasen. tickets är alla våra tickets i databasen. 
  
    console.log(ticketNr, 'ticket-number');
                
       let answere = await checkTicket(ticketNr)
        console.log(answere);
        response.json(answere);
    
});
app.get('/api/ticket', async (request, response) => {
    const ticketNr = String(request.body.ticket);
    const ticket = checkTicket(ticketNr);
    
    

    response.json(ticket);
  })




app.post('/api/event/staff', async (request, response) => {
    const credentials = request.body;
    //{ username: 'ada', password: 'pwd123' }
    const resObj = {
        success: false,
        token: ''
    }

    const account = await getAccountByUsername(credentials.username);

    if(account.length > 0) {
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

app.get('/api/event/buy', (request, response) => {
    
    const ticket=request.body;
   //Kolla i terminalen för att se hur beställningen ser ut

    const resObj = {
        success: true,
        ticketNr: ''

    };


        resObj.success = true;
       const ticketNr= generateTicketNr();
       resObj.ticketNr=ticketNr;
       console.log(ticketNr);
       saveTicket(ticketNr);
        
        resObj.genETA = generateETA();
        response.json(resObj);

const mergedObjekt={

    ...ticket,
    ...resObj
   
};

//saveEvent(mergedObjekt);
console.log(mergedObjekt);
       
});


app.listen ( 4001 ,()=>{
    console.log('started4001');
});
