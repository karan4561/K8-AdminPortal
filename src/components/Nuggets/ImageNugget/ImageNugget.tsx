import React from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { NuggetsContext } from "../../../context/NuggetsContext";

function ImageNugget() {
  const [ImageCaption, setImageCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { updateCaption } = useContext(NuggetsContext);

  const ImageCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageCaption(event.target.value);
    updateCaption({
      caption: event.target.value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
            value={ImageCaption}
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
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
    </>
  );
}

export default ImageNugget;
