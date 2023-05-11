import { useState } from "react";

interface OptionType {
  value: string;
  label: string;
  image: string;
}

export default function MyDropdown() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const options: OptionType[] = [
    { value: "option1", label: "Option 1", image: "/book.png" },
    { value: "option2", label: "Option 2", image: "/diary.png" },
    { value: "option3", label: "Option 3", image: "/pencil.png" },
    { value: "option4", label: "Option 4", image: "/book.png" },
    { value: "option5", label: "Option 5", image: "/diary.png" },
    { value: "option6", label: "Option 6", image: "/pencil.png" },
    { value: "option7", label: "Option 7", image: "/book.png" },
    { value: "option8", label: "Option 8", image: "/diary.png" },
    { value: "option9", label: "Option 9", image: "/pencil.png" },
    { value: "option11", label: "Option 11", image: "/book.png" },
    { value: "option12", label: "Option 12", image: "/diary.png" },
    { value: "option13", label: "Option 13", image: "/pencil.png" },
    { value: "option14", label: "Option 14", image: "/book.png" },
    { value: "option15", label: "Option 15", image: "/diary.png" },
    { value: "option16", label: "Option 16", image: "/pencil.png" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedOption: OptionType) => {
    setSelectedOption(selectedOption);
    setIsOpen(false);
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
              src={selectedOption.image}
              alt={selectedOption.label}
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
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="icons"
                style={{
                  backgroundColor:
                    selectedOption && selectedOption.value === option.value
                      ? "#f0f0f0"
                      : "#fff",
                }}
              >
                <img
                  src={option.image}
                  alt={option.label}
                  width={20}
                  height={20}
                />
                {/* {option.label} */}
              </div>
            ))}
          </div>
          <input type="file" accept="" className="icon-upload" />
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
