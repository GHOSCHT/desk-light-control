import React from "react";
import SerialPort from "serialport";
import { createGlobalStyle } from "styled-components";
import Knob from "./Components/Knob";

const GlobalStyle = createGlobalStyle`
  html {
    border-style: solid;
    border-color: #363636;
    border-width: 1px;
    box-sizing: border-box;
    height: 100%;
    border-bottom-style: hidden;
    border-right-style: hidden;
  }
`;

const App = () => {
  const port = new SerialPort("COM5", {
    baudRate: 9600,
    autoOpen: false,
  });
  const sendIncreaseHandler = () => {
    port.write("2i");
  };
  const sendDecreaseHandler = () => {
    port.write("2d");
  };
  const sendToggleHandler = () => {
    port.write("2t");
  };

  return (
    <div>
      <GlobalStyle />
      <Knob
        increase={sendIncreaseHandler}
        decrease={sendDecreaseHandler}
        toggle={sendToggleHandler}
      />
      <button
        type="button"
        onClick={() => {
          port.open();
        }}
      >
        open
      </button>
      <button
        type="button"
        onClick={() => {
          port.close();
        }}
      >
        close
      </button>
      <button
        type="button"
        onClick={() => {
          const list = SerialPort.list();
          list.then((arg) => {
            console.log(arg);
          });
        }}
      >
        list
      </button>
    </div>
  );
};
export default App;
