import { NuggetsContext } from "../../context/NuggetsContext";
import React, { useContext, useState, useEffect } from "react";
import { uploadImage, postImage, getHeaderIcons } from "@/api/utils";
import { FileObject } from "@/interfaces/INugget";

interface OptionType {
  _id?: string;
  name?: string;
  baseUrl: string;
  key: string;
  type?:
    | "CONTENT"
    | "TEST"
    | "SUBJECTIVE_TEST_SOLUTIONS"
    | "VIMEO"
    | "JWPLAYER";
  organization?: string;
  size?: number;
  details?: string;
}

export default function IconDropdown({props}:any) {
  const { icon, updateHeaderIcon, updateFileObj } = useContext(NuggetsContext);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<FileObject>();
  const { nugget, nuggetId } = useContext(NuggetsContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedOption: OptionType) => {
    setSelectedOption(selectedOption);
    setIsOpen(false);
    if (updateHeaderIcon) updateHeaderIcon(selectedOption);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData).then((data) => setUploadedImage(data));
    }
  };

  async function uploadimage(uploadedImage: FileObject) {
    await postImage({
      baseUrl: uploadedImage.baseUrl,
      key: uploadedImage.key,
    });
    getHeaderIcons().then((data) => updateFileObj(data));
  }
  useEffect(() => {
    if (uploadedImage) {
      uploadimage(uploadedImage);
    }
    console.log("***This is selected Option****", selectedOption);
  }, [uploadedImage]);

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {nuggetId && nugget.headerIcon?.baseUrl && nugget.headerIcon?.key ? (
          <img
            className="dropdownHeader"
            style={{ display: "flex", alignItems: "center" }}
            src={nugget.headerIcon.baseUrl + nugget.headerIcon.key}
            width={30}
            height={30}
            alt=""
          />
        ) : selectedOption ? (
          <div
            className="dropdownHeader"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={nugget.headerIcon?.baseUrl + nugget.headerIcon?.key}
              alt={selectedOption._id}
              width={30}
              height={30}
            />
          </div>
        ) : (
          <div className="dropdownText" style={{ color: "#999" }}>
            Select
          </div>
        )}
        <div>&#x25BE;</div>
      </div>
      {isOpen && (
        <div className="icon-list">
          <div className="dropdown-menu">
            {icon?.map((option) => (
              <div
                key={option._id}
                onClick={() => handleOptionClick(option)}
                className="icons"
                style={{
                  backgroundColor:
                    selectedOption && selectedOption._id === option._id
                      ? "#f0f0f0"
                      : "#fff",
                }}
              >
                <img
                  src={option.baseUrl + option.key}
                  alt={option._id}
                  width={20}
                  height={20}
                />
                {/* {option.label} */}
              </div>
            ))}
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
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
