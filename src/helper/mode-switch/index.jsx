import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkMode } from "../../store/app-mode/action";
import { BsSun } from "react-icons/bs";
import { IoMdMoon } from "react-icons/io";
import "./index.css"
const Modeswitch = () => {
  const userViewMode = useSelector((state) => state.changeTheMode.isdarkMode);
  const dispatch = useDispatch();
  return (
    <div className="mode-button">
      <button onClick={() => dispatch(darkMode())}>
        {userViewMode ? <BsSun  /> : <IoMdMoon/>}
      </button>
    </div>
  );
};
export default Modeswitch;
