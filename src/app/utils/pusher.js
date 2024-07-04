import PusherClient from "pusher-js"
import PusherServer from "pusher"



export const pusherServer = new PusherServer({
    appId:process.env.NEXT_PUBLIC_APP_ID,
    key:process.env.NEXT_PUBLIC_KEY,
    secret:process.env.NEXT_PUBLIC_SECRET,
    cluster:"ap2"
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_KEY,{
    cluster:"ap2"
})

