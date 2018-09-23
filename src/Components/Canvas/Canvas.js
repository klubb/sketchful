import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Tool from "../Tool/Tool";
import io from "socket.io-client";
import "./Canvas.css";
import menu from "./menu.png";

const serverAddress = "http://localhost:4444";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.display = React.createRef();
    this.socket = null;
    this.state = {
      menuPressed: false,
      brushColor: { r: 0, g: 0, b: 0, a: 255 },
      brushSize: 3,
      toolId: "pen",
      isPenDown: false,
      mouseX: 0,
      mouseY: 0,
      prevX: 0,
      prevY: 0,
      cursors: [],
      name: "",
      loaded: true
    };
  }

  componentDidMount() {
    this.socket = io(serverAddress);
    this.socket.on("line", data => {
      if (this.state.loaded) {
        const [x1, y1, x2, y2] = data.lineCoordinates;
        const displayCtx = this.display.current.getContext("2d");
        displayCtx.lineWidth = data.lineWidth;
        displayCtx.strokeStyle = `rgba(${data.lineColor.r},${
          data.lineColor.g
        },${data.lineColor.b},${data.lineColor.a})`;
        displayCtx.beginPath();
        displayCtx.moveTo(x1, y1);
        displayCtx.lineTo(x2, y2);
        displayCtx.stroke();
      }
    });
    this.socket.on("cursor", data => {
      if (this.state.loaded) {
        this.setState({ cursors: data });
      }
    });
  }

  handleToolClick(toolId) {
    this.setState({ toolId });
  }
  handleColorChange(color) {
    this.setState({ brushColor: color.rgb });
  }
  handleDisplayMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
    if (this.state.isPenDown) {
      this.display.current.getContext("2d").lineCap = "round";
      const { top, left } = this.display.current.getBoundingClientRect();
      switch (this.state.toolId) {
        case "pen":
          this.socket.emit("line", {
            lineWidth: this.state.brushSize,
            lineColor: this.state.brushColor,
            lineCoordinates: [
              this.state.prevX - left,
              this.state.prevY - top,
              this.state.mouseX - left,
              this.state.mouseY - top
            ],
            sessionKey: window.localStorage.getItem("sessionKey")
          });
          break;
        case "eraser":
          this.socket.emit("line", {
            lineWidth: this.state.brushSize,
            lineColor: { r: 255, g: 255, b: 255, a: this.state.brushColor.a },
            lineCoordinates: [
              this.state.prevX,
              this.state.prevY,
              this.state.mouseX,
              this.state.mouseY
            ],
            sessionKey: window.localStorage.getItem("sessionKey")
          });
          break;

        default:
          return null;
      }
    }
    this.setState({
      prevX: this.state.mouseX,
      prevY: this.state.mouseY
    });
    if (!this.state.isPenDown) {
      this.setState({
        prevX: e.clientX,
        prevY: e.clientY
      });
    }
    this.socket.emit("cursor", {
      x: this.state.mouseX,
      y: this.state.mouseY,
      sessionKey: window.localStorage.getItem("sessionKey")
    });
  }
  handleDisplayMouseDown(e) {
    this.setState({ isPenDown: true });
  }
  handleDisplayMouseUp(e) {
    this.setState({ isPenDown: false });
  }
  handleBrushResize(e) {
    this.setState({ brushSize: e.target.value });
  }

  handleMenu = () => {
    console.log(this.state.menuPressed);
    this.setState({
      menuPressed: !this.state.menuPressed
    });
  };

  handleClear = () => {
    var s = document.getElementById("display");
    var w = s.width;
    s.width = 10;
    s.width = w;
  };

  render() {
    
    return (
      <div>
        <canvas
          

          
          id="display"
          width="900"
          height="480"
          ref={this.display}
          onMouseMove={this.handleDisplayMouseMove.bind(this)}
          onMouseDown={this.handleDisplayMouseDown.bind(this)}
          onMouseUp={this.handleDisplayMouseUp.bind(this)}
          
        />
        
        <div className="img">
          {/* <img onClick={this.handleMenu} className='menubtn' src={menu} 
          alt=""/> */}
          <i onClick={this.handleMenu} className="fas fa-bars menubtn"></i>
        </div>

        <div className="toolbox">
          {this.state.menuPressed ? (
            <ChromePicker
              className="chromepicker"
              color={this.state.brushColor}
              onChangeComplete={this.handleColorChange.bind(this)}
            />
          ) : null}

          <span
            className="brush-size-indicator"
            style={{
              width: this.state.brushSize + "px",
              height: this.state.brushSize + "px",
              background: this.state.brushColor
            }}
          />
        </div>
        <div className="draw-container">
          <Tool
            className="tool"
            name="Eraser"
            currentTool={this.state.toolId}
            toolId="eraser"
            onSelect={this.handleToolClick.bind(this)}
          />
          <Tool
            className="tool"
            name="Pen"
            currentTool={this.state.toolId}
            toolId="pen"
            onSelect={this.handleToolClick.bind(this)}
          />

          <button onClick={this.handleClear} className="clearbtn">
            Clear
          </button>
        </div>
      </div>
    );
  }
}
export default Canvas;
