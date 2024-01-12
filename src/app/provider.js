"use client"
import {SessionProvider} from "next-auth/react"


export const Provider = ({children}) =>{
    return <SessionProvider>{children}</SessionProvider>
}


// const signInHandler = async() =>{
//     const signToUser = await signIn("credentials",{
//       name:userSignIn.name,
//       // password:userSignIn.password,
//     })
//     console.log(signToUser)
//   }