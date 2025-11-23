const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD } = require('../env.js')

/** send mail from real Gmail account */
const signup = async (req, res) => {
    try {
        // Get data from form
        const { recipient, subject, message } = req.body;

        // Validate input
        if (!recipient || !subject || !message) {
            return res.status(400).json({ 
                msg: "Semua field harus diisi!" 
            });
        }

        // Gmail SMTP configuration
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        let emailMessage = {
            from: `"Raditya Putra Farma" <${EMAIL}>`, // sender address
            to: recipient, // recipient from form
            subject: subject, // subject from form
            text: message, // plain text body from form
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px;">
                     <div style="background: #003161; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                       <h1 style="margin: 0; font-size: 24px;">📧 Email Sender Portfolio</h1>
                     </div>
                     <div style="padding: 30px 20px;">
                       <h2 style="color: #003161; margin-top: 0;">${subject}</h2>
                       <p style="line-height: 1.8; color: #333; white-space: pre-wrap;">${message}</p>
                     </div>
                     <div style="background: #f9f9f9; padding: 15px 20px; border-radius: 0 0 10px 10px; text-align: center;">
                       <p style="color: #888; font-size: 12px; margin: 0;">Dikirim melalui Email Sender Portfolio | © 2025 Raditya Putra Farma</p>
                     </div>
                   </div>`, // html body
        }

        let info = await transporter.sendMail(emailMessage);
        
        return res.status(201).json({ 
            msg: "Email berhasil dikirim ke inbox penerima! ✅",
            info: info.messageId
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            msg: "Gagal mengirim email",
            error: error.message 
        });
    }
}


module.exports = {
    signup
}