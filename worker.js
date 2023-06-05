const cron = require("node-cron"); // Instancio el paquete 'node-cron' // Instancio el paquete 'express'
const fs = require('fs');
const postgresHelper = require("./helpers/postgresDB.helper");
const entriesDepartures = require("./services/vehicles.service");
const sendEmail = require("./services/sendEmail.service");


const intervalDataMinute = process.env.TIMEMINUTE_GETDATA;
const intervalDataHour = process.env.TIMEHOUR_GETDATA;
start();
async function start(){
  postgresHelper.sequelize.authenticate().then(() =>{
    cron.schedule(`00 6 * * *`, async () => {
      let flag = fs.readFileSync('./band.json', 'utf-8')
      if(flag === "true"){
        await entriesDepartures.taskEntriesDepartures();
        await sendEmail("Task Entries and Departures of Vehicles executed successfully!")
          }
    },{
      scheduled: true,
      timezone: "America/Mexico_City"
    });

  }).catch((err) => {
    // console.log(err.message),
    // logger.errorLoggerBD.error(err.message);
    sendEmail(`Error executing the task; ${err.message}`);
  });
}