const express = require("express");

const amqplib = require("amqplib");

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel()
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async(data) => {
            const object = JSON.parse(`${Buffer.from(data.content)}`)
            await EmailService.sendEmail(
                "dev.bibek.25@gmail.com",
                object.recepientEmail, 
                object.subject,
                object.text
            );
            channel.ack(data)
        });
    } catch (error) {  
        console.log(error);
        
    }
}

const apiRouter  = require("./routes")
const {serverConfig, Logger} = require("./config")

const mailSender = require('./config/email-config');
const { EmailService } = require("./services");

const app = express();
console.log("Bibek ray");

app.use(express.json())

app.use('/api', apiRouter)

app.listen(serverConfig.PORT, async() => {
    console.log(`server started running on ${serverConfig.PORT}`);
    // try {
    //     const response = await mailSender.sendMail({
    //         from: serverConfig.EMAIL,
    //         to: "sharpspence@ysosirius.com",
    //         subject: "Is the service working!",
    //         text: "Yes it is working"
    //     });
    //     console.log("Email Sender Response: ", response);
        
    // } catch (error) {
    //     console.log(error);
        
    // }
    connectQueue()
});
