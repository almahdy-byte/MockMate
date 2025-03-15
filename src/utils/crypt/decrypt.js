import CryptoJS from "crypto-js"
import { text } from "express"
export const verify = ()=>{
    return CryptoJS.AES.decrypt(text , process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
}