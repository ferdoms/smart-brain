import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="relative dib mt2">
        <img id="input-image" src={imageUrl} width="700px" height="auto" alt="" />
        <div className="bounding-box"
         style={{
             top: box.topRow + "%",
             bottom: box.bottomRow + "%",
             right: box.rightCol + "%",
             left: box.leftCol + "%"
         }}></div>
     </div>
    </div>
  );
};
export default FaceRecognition;
