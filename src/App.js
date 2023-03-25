import React, { useState } from "react";
import { Loader } from "@react-three/drei";
import "./App.css";
import { Scene } from "./Scene";
import VidyaIcon from "@mui/icons-material/AutoAwesome";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import { CameraFiles } from "./CameraFiles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tooltip } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: `"Courier", "Arial", monospace`,
  },
  card: {
    backgroundColor: "#c5ccb6 !important",
  },
});

const App = () => {
  var photoData = shuffle(CameraFiles);
  var photoData = CameraFiles;
  const [allPhotos, setAllPhotos] = useState(photoData);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  function revealPhoto() {
    var currentVisible = visiblePhotos;
    var currentAll = allPhotos;
    if (allPhotos.length > 0) {
      var toAdd = currentAll.pop();
      setAllPhotos(currentAll);
      setVisiblePhotos(currentVisible.concat([toAdd]));
    }
  }

  return (
    <>
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <ThemeProvider theme={theme}>
          <div
            style={{
              position: "absolute",
              bottom: "0em",
              right: "0em",
              zIndex: "10000",
            }}
          >
            <Tooltip title="made by vidya giri">
              <Button target="_blank" rel="noreferrer" href="https://vidyagiri.com">
                <VidyaIcon />
              </Button>
            </Tooltip>
          </div>

          <div
            style={{
              position: "absolute",
              top: "0em",
              right: "0em",
              zIndex: "10000",
            }}
          >
            <Tooltip title="elaine's camera">
              <Button onClick={revealPhoto}>
                <CameraIcon />
              </Button>
            </Tooltip>
          </div>

          <Scene allPhotos={allPhotos} visiblePhotos={visiblePhotos} />
          {/* <Loader /> */}
        </ThemeProvider>
      </div>
    </>
  );
};

export default App;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
