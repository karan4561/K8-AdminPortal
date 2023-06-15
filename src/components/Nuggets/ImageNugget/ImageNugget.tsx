import React from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { uploadImage, postImage } from "@/api/utils";
import { NuggetsContext } from "../../../context/NuggetsContext";
import { FileObject } from "@/interfaces/INugget";

function ImageNugget() {
  const [ImageCaption, setImageCaption] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { updateCaption, nugget } = useContext(NuggetsContext);

  const ImageCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageCaption(event.target.value);
    updateCaption({
      caption: event.target.value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData, "formData");
      uploadImage(formData).then((data) => setUploadedImage(data));
      setSelectedImage(file);
    }
  };

  return (
    <>
      <div className="card-header add-section image-nugget">
        <div className="video-caption">
          <p>Caption (Optional)</p>
          <input
            className="image-type-input"
            type="text"
            value={nugget.caption}
            onChange={ImageCaptionChange}
            placeholder="Caption"
          />
        </div>
        <div className="image-upload">
          <div>
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                width={200}
                height={100}
                alt=""
              />
            )}
          </div>
          <label htmlFor="file-input">
            <img src="/upload.png" width={20} height={20} />
            <p>Upload Icon</p>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </>
  );
}

export default ImageNugget;