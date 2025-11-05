/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// ✅ Configure Cloudinary (only once, at module level)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Helper function to convert Buffer to Stream
function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("upload-img") as File;
    const folderName = formData.get("folderName") as string;

    if (!file) {
      return new Response(
        JSON.stringify({ 
          msg: "File not found", 
          statusCode: 400 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folderName || 'Card-app', 
          resource_type: 'auto', 
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      // Convert buffer to stream and pipe to upload stream
      const stream = bufferToStream(buffer);
      stream.pipe(uploadStream);
    });

    // ✅ Return success response with Cloudinary result
    return Response.json({ 
      state: "ok", 
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        folder: result.folder
      }
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    
    // ✅ Proper error response
    return new Response(
      JSON.stringify({ 
        msg: error.message || "Upload failed", 
        statusCode: 500 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};