import React, { useRef } from "react";
import { useState, useContext } from "react";
import Image from "next/image";
import { uploadImage, postImage } from "@/api/utils";
import { NuggetsContext } from "../../../context/NuggetsContext";
import { FileObject } from "@/interfaces/INugget";

function AudioNugget() {
  const audioRef = useRef(null);
  const { updateCaption, nugget, audioURI } = useContext(NuggetsContext);

  const audioCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCaption({
      caption: event.target.value,
    });
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData).then((data) => audioURI({URI:data}));
    }
  };

  return (
    <div className="card-header add-section image-nugget">
    <div className="video-caption">
      <p>Caption (Optional)</p>
      <input
        className="image-type-input"
        type="text"
        value={nugget.caption}
        onChange={audioCaptionChange}
        placeholder="Caption"
      />
    </div>
    <div className="image-upload">
      <div>
        {nugget.audioUri && (
          <audio ref={audioRef} controls>
          <source src={nugget.audioUri.baseUrl+nugget.audioUri.key} type="audio/mpeg" />
      </audio>
        )}
      </div>
      <label htmlFor="file-input" className="img-input">
        <img src="/upload.png" width={20} height={20} />
        <p>Upload Audio file here</p>
      </label>
      <input
        id="file-input"
        type="file"
        accept="audio/*"
        onChange={handleAudioUpload}
      />
    </div>
  </div>
  )
}

export default AudioNugget