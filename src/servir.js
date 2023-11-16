const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require('dotenv').config(); 

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para manejar el envío del formulario
app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configuración del transporte para el servicio de correo electrónico
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Accede a las variables de entorno
      pass: process.env.EMAIL_PASS, // Accede a las variables de entorno
    },
  });

  // Detalles del correo electrónico
  const mailOptions = {
    from: email,
    to: "your_email@gmail.com", // La dirección de correo a la que quieres recibir los mensajes
    subject: subject,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
