"use client"
import { CldUploadButton, CldUploadWidget, CloudinaryUploadWidgetResults, getCldImageUrl } from 'next-cloudinary';
import { useEffect } from 'react';
import Image from '../image/page';
 
const UploadingImage = () =>{


    useEffect(()=>{
        const fetchImage = async()=>{
            const respons = await fetch("/api/image",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const images = await respons.json()
        }
        fetchImage()
    },[])

    const uploadImageHandler = (result:any)=>{
    }


    return(
        <div>
           <CldUploadButton  uploadPreset="twitter-analog" onSuccess={(result) => uploadImageHandler(result)}/>
        </div>
    )
}


export default UploadingImage