import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    ACCESS_GMAIL,
    CLIENT_URI
} = process.env;


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMailActiveLink = (email, user, url) => {
    const accessToken = oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: `${ACCESS_GMAIL}`,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        },
    });

    const mailOptions = {
        from: `Redstore < ${ACCESS_GMAIL}>`,
        to: email,
        subject: "Email Confirmation",
        html: `
            <p>Hello <br/>${user}</p>
            <p>
                Your ${email} is signup at this ${CLIENT_URI}.<br />
                Your account is almost ready, but before you can login you need to confirm your email id by visitng the link below.
            </p>
            <a href=${url}>${url}</a><br/>
            <p>Once you have visited the verification URL, your account will be activated.</p>
            <p>If you have any problems or questions, please reply to this email.</p>
            <p>Thanks</p>
        `
    };

    const emailSend = transport.sendMail(mailOptions);
    if (!emailSend) {
        res.status(400);
        throw new Error('Something went wrong');
    }
}

const sendMailForgotPassword = (email, name, uniqueNumber) => {
    const accessToken = oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: `${ACCESS_GMAIL}`,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        },
    });

    const mailOptions = {
        from: `Redstore < ${ACCESS_GMAIL}>`,
        to: email,
        subject: "Forgot Password",
        html: `
            <p>Hello ${name}</p>
            <p>
                We received a request to reset your Redstore password.<br />
                Enter the following password reset code:
            </p>
            <button 
                style="padding:"10px, 30px", border:"1px solid tomato"; border-radius:"5px""
            >
                ${uniqueNumber}
            </button><br/><br/>
            Thanks
        `
    };

    const emailSend = transport.sendMail(mailOptions)
    if (!emailSend) {
        res.status(400);
        throw new Error('Something went wrong');
    }
}


export {
    sendMailActiveLink,
    sendMailForgotPassword
}