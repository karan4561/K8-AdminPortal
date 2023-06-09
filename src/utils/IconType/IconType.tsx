import { NuggetsContext } from "../../context/NuggetsContext";
import React, { useContext, useState, useEffect } from "react";
import { uploadImage, getHeaderIcons } from "@/api/utils";

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

export default function MyDropdown() {
  const { icon, updateHeaderIcon, updateFileObj } = useContext(NuggetsContext);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadIcon, setUploadIcon] = useState<File>();
  
  const handleSubmit = async (e: any) => {
    if (uploadImage) {
      const formData = new FormData();
      formData.append("myfile", uploadIcon);
      console.log(uploadImage,"uploadImageapi");
      await uploadImage(formData).then(data => {
        debugger
        console.log(data.data,"data.data");
    });;
    }
  };
  // const options: OptionType[] | undefined = icon;
  // useEffect(() => {
  //   getHeaderIcons().then((data) => updateFileObj(data));
  // }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log(uploadImage, "uploadImage");

  const handleOptionClick = (selectedOption: OptionType) => {
    setSelectedOption(selectedOption);
    setIsOpen(false);
    updateHeaderIcon(selectedOption)
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadIcon(file);
      handleSubmit
    }
    console.log(uploadImage.files);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption ? (
          <div
            className="dropdownHeader"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={selectedOption.baseUrl + selectedOption.key}
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
          <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} />
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
