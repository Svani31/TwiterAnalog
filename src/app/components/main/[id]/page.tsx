/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useParams } from 'next/navigation'
import React from 'react'

function Post() {
    const params = useParams()
    console.log(params)
  return (
    <div>Post</div>
  )
}

export default Post