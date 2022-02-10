const express = require("express");//laddar in express jwt
const app = express();
const jwt = require("jsonwebtoken");


//hämtsa ifrån databasen
const {getEvent,saveEvent,saveTicket,getEventById,getAccountByUsername} = require ('./database/operations');
const {generateTicketNr} = require ('./utils/ticket');
const { hashPassword, comparePassword } = require('./utils/bcrypt'); 
const { generateETA } = require('./utils/ticket');

/* const { hashPassword, comparePassword } = require('./utils/bcrypt');  */

//createOrderContainer();

app.use (express.static('../frontend'));//kopplar ihop backend med frontend
app.use (express.json());


// hämta eventet i databasen
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

app.post('/api/staff/login', async (request, response) => {
    const credentials = request.body;
    //{ username: 'ada', password: 'pwd123' }

    const resObj = {
        success: false,
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
    console.log(ticket); //Kolla i terminalen för att se hur beställningen ser ut

    const resObj = {
        success: true,
        ticketNr: ''
    
    }


        //order.id = data.id; // Kopplar samman beställningen med användarnamnet från JWT som skickades med i anropet
        
        saveTicket(ticket); // Spara beställningen till databasen
     

        resObj.success = true;
        resObj.ticketNr = generateTicketNr();
        resObj.ticketNr = generateETA();
   
        
    

    response.json(resObj);
    console.log(resObj);
    
});





app.listen ( 4001 ,()=>{
    console.log('started4001');
});
