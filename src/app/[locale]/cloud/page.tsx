"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  return (
    <div className="h-screen w-screen ">
      <form
        action=""
        className="p-14"
        onSubmit={async(e) => {
          e.preventDefault();
          const formDate = new FormData();

          if (file) {
            formDate.append("upload-img", file);
            formDate.append("folderName", 'test');
            const req = await fetch('/api/fileUpload',{method:"POST" ,body:formDate});
           
            
            
          } else {
            alert("file is requried");
          }
        }}
      >
        <label htmlFor="">
          <input type="file" name="upload-img" onChange={handleChange} />
        </label>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            width={400}
            height={400}
            alt="img-upload"
          />
        )}
        <button type="submit">submit</button>
      </form>



    </div>
  );
}
