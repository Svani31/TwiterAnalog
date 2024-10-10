


export const Users = async()=>{
    try{
            const respons = await fetch("/api/user",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const users = await respons.json()
            console.log(users)
            return users

    }catch(error){
        throw error
    }
}