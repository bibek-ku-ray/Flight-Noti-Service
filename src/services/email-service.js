const { MAILER } = require("../config");
const { TicketRepository } = require("../repositories");

const ticketRepo = new TicketRepository()

async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = MAILER.sendMail({
            from: mailFrom, 
            to: mailTo,
            subject: subject, 
            text: text
        })
        return response
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepo.create(data)
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getPendingTickets() {
    try {
        const response = await ticketRepo.getPendingTicket()
        return response
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingTickets
}