const { Router } = require('express')
const  nodemailer  = require('nodemailer')
const router = Router()


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
    host: 'mail.mariachon.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tellez@mariachon.com',
        pass: '3!NVRLVlA=6v'
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