import { NextResponse } from "next/server";
import {
  PutObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";


const s3Client = new S3Client({
  region: process.env.amazonRegion,
  credentials: {
    accessKeyId: process.env.amazonAccesskey,
    secretAccessKey: process.env.amazonSercertKey,
  },
});

async function uploadFileToS3(filebuffer, file) {
  const fileBuffer = filebuffer;
  const params = {
      Bucket: process.env.AMAZON_BUCKET_NAME,
      Key: `${file.name}-${Date.now()}`,
      Body: fileBuffer,
      ContentType: file.type,
    };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return file.name;
}

export async function POST(requset) {
  try {
    const formData = await requset.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({error:console.log(error)});
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    throw error;
  }
}
