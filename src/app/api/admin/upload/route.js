import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { file } = data;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: 'bandhu_projects',
      resource_type: 'auto',
    });

    return NextResponse.json({ 
      url: uploadResponse.secure_url,
      resource_type: uploadResponse.resource_type
    });
    
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}