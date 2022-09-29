import React from "react";
import ReactDOM from "react-dom/client";

import { AnimatorGeneralProvider, Animator } from "@arwes/animation";
import { ArwesThemeProvider, StylesBaseline, Text, LoadingBars } from "@arwes/core";
import { BleepsProvider } from "@arwes/sounds";
import { animatorGeneral, audioSettings, bleepsSettings, globalStyles, playersSettings, themeSettings } from "./config/theme";

import { host } from "./config/network";
import Status from "./Status";

const Sandbox = () => {
  const [activate, setActivate] = React.useState(true);
  const [status, setStatus] = React.useState(null);

  const loadStatus = async () => {
    const response = await fetch(`${host}/api/status`);
    const data = await response.json();
    setStatus(data);
  };

  React.useEffect(() => {
    const timeout = setInterval(() => {
      loadStatus();
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <ArwesThemeProvider themeSettings={themeSettings}>
      <StylesBaseline styles={globalStyles} />
      <BleepsProvider audioSettings={audioSettings} playersSettings={playersSettings} bleepsSettings={bleepsSettings}>
        <AnimatorGeneralProvider animator={animatorGeneral}>
          {status === null ? <LoadingBars animator={{ activate }} /> : <Status status={status} activate={activate} />}
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sandbox />
  </React.StrictMode>
);
