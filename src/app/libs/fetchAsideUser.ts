import { useSession } from "next-auth/react"


export const asideUser = async(myUserId:string) =>{
    try{
            const respons = await fetch(`api/user`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await respons.json()
            return data

    }catch(error){
        throw error
    }
}