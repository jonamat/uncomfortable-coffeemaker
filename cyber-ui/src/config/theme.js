const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const FONT_FAMILY_CODE = '"Source Code Pro", monospace';

const SOUND_ASSEMBLE_URL = "/sounds/assemble.mp3";
// const SOUND_TYPE_URL = "/sounds/type.mp3";
const SOUND_CLICK_URL = "/sounds/click.mp3";
// const SOUND_OBJECT_URL = "/sounds/object.mp3";
const SOUND_WARNING_URL = "/sounds/warning.mp3";

export const themeSettings = {
  palette: {
    primary: { main: "#40ffce" },
    secondary: { main: "#c466dc" },
    neutral: { main: "#001711" },
    text: {
      root: "#35efaa",
      headings: "#40ffce",
      link: "#c466dc",
      linkHover: "#d491fa",
    },
  },
  fontScale: 1,
  space: 8,
  outline: 2,
  shadow: { blur: 2 },
};

export const globalStyles = {
  "html, body": { fontFamily: FONT_FAMILY_ROOT },
  "code, pre": { fontFamily: FONT_FAMILY_CODE },
  body: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "1024px",
    margin: "0 auto",
  },
};

export const animatorGeneral = { duration: { enter: 200, exit: 200 } };

export const audioSettings = {
  common: { volume: 0.25 },
  categories: {
    // Interaction bleeps settings.
    interaction: {
      volume: 0.25,
    },
    // Notification bleeps settings.
    notification: {
      volume: 1,
    },
  },
};

export const playersSettings = {
  assemble: { src: [SOUND_ASSEMBLE_URL], loop: true },
  // type: { src: [SOUND_TYPE_URL], loop: true },
  click: { src: [SOUND_CLICK_URL] },
  // object: { src: [SOUND_OBJECT_URL] },
  warning: { src: [SOUND_WARNING_URL] },
};

export const bleepsSettings = {
  assemble: { player: "assemble" },
  // type: { player: "type" },
  // object: { player: "object" },
  click: { player: "click", category: "interaction" },
  warn: {
    player: "warning",
    category: "notification",
  },
};
