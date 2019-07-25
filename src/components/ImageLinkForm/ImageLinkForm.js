import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div className="App">
      <p className="f3">
        This Magic Brain will detect faces in your pictures Give it a try!!!
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-2 center">
        <input className="f3 pa2 w-70 center" type="text" />
        <button className="w-30 grow f3 link ph3 pv2 dib white bg-navy b--navy">
          Detect
        </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
