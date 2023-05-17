import React from 'react'
import { useState, useRef, useEffect } from 'react';

function LTI() {
  const [ImageCaption, setImageCaption] = useState('');
  const ImageCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageCaption(event.target.value);
    // updateCaption({
    //     caption: event.target.value
    // })
  };
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState([]);

  const canvasRef = useRef(null);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

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

  function handleCanvasClick(event: { clientX: number; clientY: number; }) {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against null canvas
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newPoint = { x, y };
    setPoints([...points, newPoint]);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  
  function handleDeleteClick(index: number) {
    const newPoints = [...points];
    newPoints.splice(index, 1);
    setPoints(newPoints);
    redrawPoints();
  }

  function redrawPoints() {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against null canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (image) {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    for (let i = 0; i < points.length; i++) {
      const { x, y } = points[i];
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
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
          <input className='image-type-input' type="text" value={ImageCaption} onChange={ImageCaptionChange} placeholder='Caption' />
        </div>
        <input type="file" onChange={handleImageUpload} />
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onClick={handleCanvasClick}
        />
        <ul>
          {points.map((point, index) => (
            <li key={index}>
              Point {index + 1}: ({point.x}, {point.y})
              <button onClick={() => handleDeleteClick(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default LTI