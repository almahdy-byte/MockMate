import nodemailer from "nodemailer";
import EventEmitter from "events";
export const subjects={
    confirmEmail:"Confirm Email",
    resetPassword:"Reset Password",
    resetEmail:"Reset Email",
}
Object.freeze(subjects);
export const sendEmail = async({to , subject ,text ,html})=>{
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  service: "gmail",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mohamedalmahdy02@gmail.com', 
    to, 
    subject, 
    text, 
    html,
  });

}

main().catch(console.error);

}

export const emailEvent = new EventEmitter();
emailEvent.on('confirmEmail',async({to , subject = subjects.confirmEmail , text , html})=>{
await sendEmail({to , subject , text , html})
})

emailEvent.on('resetPassword',async({to , subject = subjects.resetPassword , text , html})=>{
  await sendEmail({to , subject , text , html});
  
  })
emailEvent.on('resetEmail',async({to , subject = 'Change Email' , text , html})=>{
    await sendEmail({to , subject , text , html})
console.log(1);
    
    })