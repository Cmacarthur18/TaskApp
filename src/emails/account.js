const sgMail = require('@sendgrid/mail')

//const sendgridAPIKEY = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'chet109@gmail.com',
        subject: 'thansk for joining',
        text: `Here is you new account, ${name}` //use back ticks
    })
}

const sendDeleteEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chet109@gmail.com',
        subject: 'Goodbye',
        text: `sorry to see you go ${name}` //use back ticks
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail

}
// sgMail.send({ // how we send an emial
//     to: 'chet109@gmail.com',
//     from: 'chet109@gmail.com',
//     subject: 'first',
//     text: 'Test'
// })