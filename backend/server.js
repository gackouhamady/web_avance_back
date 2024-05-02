
 
const express=require('express');
const connectDB = require('./config/db');

const app =express();
connectDB();


port=30002;

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ajoutez ces en-têtes à votre route API pour autoriser les requêtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Autoriser les requêtes depuis localhost:3000
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Autoriser les méthodes GET, POST, PUT, DELETE
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autoriser les en-têtes Content-Type et Authorization
    next();
  });


  
app.use("/chambre", require("./routes/routeChambre"));


app.use("/client", require("./routes/routeClient")); 


app.use("/reservation",require("./routes/routeReservation"))


app.use("/receptionniste", require("./routes/routeReceptionniste")); 


 
app.listen(port,()=> console.log("Le serveur est demare au port "+port));