import React from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { uploadImage, postImage } from "@/api/utils";
import { NuggetsContext } from "../../../context/NuggetsContext";
import { FileObject } from "@/interfaces/INugget";

function ImageNugget() {
  const { updateCaption, nugget, imageURI } = useContext(NuggetsContext);

  const ImageCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCaption({
      caption: event.target.value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData).then((data) => imageURI({URI:data}));
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
            {nugget.imageUri && (
              <img
                src={nugget.imageUri.baseUrl+nugget.imageUri.key}
                width={300}
                height={200}
                alt=""
              />
            )}
          </div>
          <label htmlFor="file-input" className="img-input">
            <img src="/upload.png" width={20} height={20} />
            <p>Upload Image here</p>
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