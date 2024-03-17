"use client"
import { useParams } from "next/navigation"



const Post = () =>{
  const params = useParams()
  console.log(params)
  return(
    <div>
      dfgd
    </div>
  )
}

export default Post