import { Button, Text, FrameHexagon, Blockquote, FrameCorners } from "@arwes/core";
import { Animator } from "@arwes/animation";
import { useBleeps } from "@arwes/sounds";
import React from "react";

import { host } from "./config/network";

const Status = ({ status, activate }) => {
  const bleeps = useBleeps();

  // const [logLines, setLogLines] = React.useState([]);
  const [isReadyForCoffee, setIsReadyForCoffee] = React.useState(null);

  React.useEffect(() => {
    if (status.isReadyForCoffee && isReadyForCoffee === false) {
      bleeps.warn.play();
    }
    setIsReadyForCoffee(status.isReadyForCoffee);
  }, [status, status.isReadyForCoffee]);

  /*
  const addLogLine = (line) => {
    const tmp = [line, ...logLines];
    tmp.slice(0, 5);
    setLogLines(tmp);
  };

  React.useEffect(() => {
    const sse = new EventSource("/events", { withCredentials: false });
    sse.onmessage = (e) => addLogLine(e.data);
    sse.onerror = () => {
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);
  */

  return (
    <Animator animator={{ activate, manager: "stagger", combine: true, duration: { stagger: 50 } }}>
      <FrameHexagon hideShapes style={{ margin: "1rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text as="h1" style={{ textAlign: "center" }}>
            Coffee Maker
          </Text>
          <Button
            active
            FrameComponent={FrameHexagon}
            onClick={() => {
              fetch(`${host}/api/${status.isCoffeeMakerOn ? "off" : "on"}`);
            }}
            palette={status.isCoffeeMakerOn ? "error" : "success"}
            style={{ marginBottom: "1rem" }}
          >
            <Text>{status.isCoffeeMakerOn ? "Stop" : "Activate"}</Text>
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "0",
              width: "100%",
            }}
          >
            <Blockquote style={{ flex: 1, flexShrink: 0 }}>
              <div style={{ whiteSpace: "nowrap" }}>
                <Text>Power&nbsp;</Text>
                <Text>{status.isCoffeeMakerOn ? "ON" : "OFF"}</Text>
              </div>
            </Blockquote>
            <Blockquote style={{ flex: 1, flexShrink: 0 }}>
              <div style={{ whiteSpace: "nowrap" }}>
                <Text>Boiler&nbsp;</Text>
                <Text>{status.isBoilerOn ? "ON" : "OFF"}</Text>
              </div>
            </Blockquote>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "0",
              width: "100%",
            }}
          >
            <Blockquote style={{ flex: 1, flexShrink: 0 }}>
              <div style={{ whiteSpace: "nowrap" }}>
                <Text>Boiler Temperature&nbsp;</Text>
                <Text>{Math.ceil(status.temperature)}</Text>
                <Text>°C</Text>
              </div>
            </Blockquote>
          </div>

          <Button FrameComponent={status.isReadyForCoffee ? FrameCorners : FrameCorners} disabled={!status.isReadyForCoffee}>
            <Text>{status.isReadyForCoffee ? "READY FOR COFFEE" : "NOT READY FOR COFFEE"}</Text>
          </Button>
          {/* <Blockquote style={{ fontSize: ".5rem" }}>{logLines.join("\n")}</Blockquote> */}
        </div>
      </FrameHexagon>
    </Animator>
  );
};

export default Status;
