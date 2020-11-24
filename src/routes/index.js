
require('dotenv').config()


const { Router } = require('express')
const  nodemailer  = require('nodemailer')
const router = Router()

const HOST=process.env.HOST
const PORT_HOST=process.env.PORT_HOST
const USER_HOST=process.env.USER_HOST
const USER_PASS=process.env.USER_PASS


router.post('/send-email',  async (req, res) =>  {
    try{
    const { name, email, phone, message } = req.body

    contentHTML = `
        <h1> Información del usuario</h1>
        <ul>
            <li>Nombre del usuario: ${name}</li>
            <li>Email del usuario: ${email}</li>
            <li>Telefono del usuario: ${phone}</li>
        </ul>
        <p>${message}</p>
    `

const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT_HOST,
    secure: false,
    auth: {
        user: USER_HOST,
        pass: USER_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
})

const info = await transporter.sendMail({
    from: "'Mariachon SA de CV' <test@mariachon.com>",
    to: email,
    subject: 'Pagina del Mariachon',
    text: 'Hola mundo',
    html: contentHTML
})

    console.log('Message sent', info.messageId)
    res.redirect('/success.html')
}catch (e){
    console.log(e)
}

} 
)


module.exports = router