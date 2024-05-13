import PusherService from "pusher"
import PusherClient from "pusher-js"

export const pusherService = new PusherService({
    appId:process.env.PUSHER_APP_ID,
    key:process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    sercer:process.env.PUSHER_SECRET,
    cluster:"ap2",
    useTLS:true
});


export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    {
        cluster:"ap2"
    }
)