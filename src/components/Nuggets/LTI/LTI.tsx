import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import TextEditor from "../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "@/context/NuggetsContext";
import { Coordinates } from "@/interfaces/INugget";
import { uploadImage } from "@/api/utils";

//const initialCoordinates = {} as Coordinates;

function LTI() {
  const { nugget, updateSolHint, updateLTI, imageLTI, deleteLTI } =
    useContext(NuggetsContext);
  const [ImageCaption, setImageCaption] = useState("");
  const ImageCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageCaption(event.target.value);
    // updateCaption({
    //     caption: event.target.value
    // })
  };
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState<Coordinates[]>([]);

  const canvasRef = useRef(null);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData).then((data) => imageLTI({ URI: data }));
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function handleCanvasClick(event: { clientX: number; clientY: number }) {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against null canvas
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newPoint = { x, y };
    setPoints([...points, newPoint]);
    updateLTI(points.length, "", newPoint);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  function handleDeleteClick(index: number) {
    deleteLTI(index);
    const newPoints = [...points];
    newPoints.splice(index, 1);
    setPoints(newPoints);
    redrawPoints();
  }

  function redrawPoints() {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against null canvas
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (image) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    for (let i = 0; i < points.length; i++) {
      const { x, y } = points[i];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.fillText(`${i + 1}`, x + 8, y - 8);
    }
  }

  useEffect(() => {
    redrawPoints();
  }, [image, points]);

  return (
    <>
      <div className="card-header add-section">
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
        <input type="file" onChange={handleImageUpload} />
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onClick={handleCanvasClick}
        />
        <ul>
          {nugget.question.lti?.english.map((section, index) => (
            <div className="option-editor" key={index}>
              <p>{index + 1}</p>
              <TextEditor
                value={section.value}
                onUpdate={(content: string) =>
                  updateLTI(index, content, points[index])
                }
                fibExtraOption={"fibExtraOption"}
              />
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
            </div>
          ))}
        </ul>
        <h4>Hint</h4>
        <TextEditor
          value={nugget.question.solutions[0].english.hint}
          onUpdate={(content: string) => updateSolHint({ hint: content })}
        />
        <h4>Solution</h4>
        <TextEditor
          value={nugget.question.solutions[0].english.text}
          onUpdate={(content: string) => updateSolHint({ text: content })}
        />
      </div>
    </>
  );
}

export default LTI;
