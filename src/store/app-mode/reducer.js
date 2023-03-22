const INTIALSTATE = {
  // isdarkMode: localStorage.getItem(JSON.parse())|| false,
  isdarkMode: JSON.parse(localStorage.getItem("userMode")) || false,
};
export const changeTheMode = (state = INTIALSTATE, action) => {
  switch (action.type) {
    case "DarkMode":
      const userMode = !state.isdarkMode;
      localStorage.setItem("userMode", JSON.stringify(userMode));

      return {
        isdarkMode: userMode,
      };
    default:
      return { ...state };
  }
};
