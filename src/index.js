const express = require("express");
const apiRouter  = require("./routes")
const {serverConfig, Logger} = require("./config")

const mailSender = require('./config/email-config');

const app = express();
console.log("Bibek ray");

app.use(express.json())

app.use('/api', apiRouter)

app.listen(serverConfig.PORT, async() => {
    console.log(`server started running on ${serverConfig.PORT}`);
    try {
        const response = await mailSender.sendMail({
            from: serverConfig.EMAIL,
            to: "sharpspence@ysosirius.com",
            subject: "Is the service working!",
            text: "Yes it is working"
        });
        console.log("Email Sender Response: ", response);
        
    } catch (error) {
        console.log(error);
        
    }
});
