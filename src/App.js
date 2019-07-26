import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false
    };
  }
  calculateFaceLocation = data => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: face.left_col * 100,
      topRow: face.top_row * 100,
      rightCol: 100 - face.right_col * 100,
      bottomRow: 100 - face.bottom_row * 100
    };
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  displayFaceBox = box => {
    this.setState({ box: box });
  };
  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route });
  };
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        const box = this.calculateFaceLocation(response);
        this.displayFaceBox(box);
      })
      .catch(err => console.log(err));
  };
  renderContent = (route) => {
    switch (route) {
      case "home":
        return (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        );
      case "signin":
        return <Signin onRouteChange={this.onRouteChange} />;
      case "register":
        return <Register onRouteChange={this.onRouteChange} />;
      default:
        break;
    }
  };
  render() {
    const { route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Navigation
              onRouteChange={this.onRouteChange}
              isSignedIn={isSignedIn}
            />
        <Particles className="particles" params={particlesOptions} />
        {this.renderContent(route)}
      </div>
    );
  }
}

export default App;
