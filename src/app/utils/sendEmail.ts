import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === 'production',
        auth: {
          user: "rasel.chowdhury0001@gmail.com",
          pass: "uhqt btor owoa wxpj",
        },
      });

        // send mail with defined transport object
     await transporter.sendMail({
        from: 'rasel.chowdhury0001@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password within 10 minutes...", // Subject line
        text: "", // plain text body
        html, // html body
    });

}