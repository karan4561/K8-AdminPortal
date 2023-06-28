import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import TextEditor from "../TrueFalseNugget/TextEditor";
import { NuggetsContext } from "@/context/NuggetsContext";
import { Coordinates } from "@/interfaces/INugget";
import { uploadImage } from "@/api/utils";
import AddOptionSection from "@/components/Nuggets/FIB/components/AddOptionSection";

//const initialCoordinates = {} as Coordinates;

function LTI() {
  const { nugget, updateSolHint, updateCaption, updateLTI, imageLTI, deleteLTI } =
    useContext(NuggetsContext);
  const [ImageCaption, setImageCaption] = useState("");
  const ImageCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageCaption(event.target.value);
    updateCaption({
      caption: event.target.value
    })
  };
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState<Coordinates[]>([]);

  const canvasRef = useRef(null);
  const canvasWidth = 300;
  const canvasHeight = Math.floor(canvasWidth * (9 / 16));

  // useEffect(() => {
  //   if (nugget._id) {
  //     for (let i = 0; i < nugget.question.lti.english.length; i++) {
  //       const coordinates = nugget.question.lti.english[i].coordinates;
  //       setPoints((prevPoints) => [...prevPoints, coordinates]);
  //     }
  //   }
  // }, []);
  // console.log(points, "length");

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
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
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
    if (nugget.question.lti?.english.length == undefined) {
      updateLTI(0, "", newPoint);
    }
    else {
      updateLTI(nugget.question.lti?.english.length, "", newPoint);
    }
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    // ctx.fillText(`${points.length + 1}`, x + 8, y - 8);
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

  // function redrawPoints() {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext('2d');
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   if (image) {
  //     ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  //   }
  //   for (let i = 0; i < nugget.question.lti?.english.length; i++) {
  //     const { x, y } = nugget.question.lti.english[i].coordinates;
  //     ctx.beginPath();
  //     ctx.arc(x, y, 5, 0, 2 * Math.PI);
  //     ctx.fillStyle = 'red';
  //     ctx.fill();
  //     ctx.fillText(`${i + 1}`, x + 8, y - 8);
  //   }
  // }
  function redrawPoints() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (nugget.question.ltiImage) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

        for (let i = 0; i < nugget.question.lti?.english.length; i++) {
          const { x, y } = nugget.question.lti.english[i].coordinates;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'red';
          ctx.fillText(`${i+1}`, x + 8, y - 8);
          ctx.fill();
        }
      };
      image.src = nugget.question.ltiImage.baseUrl + nugget.question.ltiImage.key;
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      redrawPoints();
    }
  }, [nugget.question.ltiImage, points, nugget.question.lti?.english]);

  // useEffect(() => {
  //   redrawPoints();
  // }, [points]);

  return (
    <>
      <div className="card-header add-section LTIImage">
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
        <div className="lti-image-upload">
          {/* <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
          /> */}
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
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
          />
          {/* <input type="file" onChange={handleImageUpload} />
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onClick={handleCanvasClick}
            /> */}
        </div>
        {/* <ul> */}
        <div className="lti-label">
          {nugget.question.lti?.english.map((section, index) => {
            return (
              <>
                <div className="ltiOption-border">
                  <div className="ltiOption">
                    <p>{index + 1}</p>
                    <textarea
                      className="lti-textarea"
                      value={section.value}
                      onChange={(event) =>
                        updateLTI(index, event.target.value, nugget.question.lti.english[index].coordinates)
                      }
                    />
                  </div>
                  <button onClick={() => handleDeleteClick(index)}>Delete</button>
                </div>
              </>
            )
          })}
        </div>
        <div className="fib-card">
          <h4>Add Other options</h4>
          <AddOptionSection value="lti" />
        </div>
        {/* </ul> */}
        <h4>Hint</h4>
        <TextEditor
          value={nugget.question?.solutions?.[0]?.english?.hint}
          onUpdate={(content: string) => updateSolHint({ hint: content })}
        />
        <h4>Solution</h4>
        <TextEditor
          value={nugget.question.solutions?.[0].english.text}
          onUpdate={(content: string) => updateSolHint({ text: content })}
        />
      </div>
    </>
  );
}

export default LTI;
