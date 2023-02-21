import "./App.css";
import Approutes from "./Router/Approutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./store/Auth/action";

function App() {
  const id = localStorage.getItem("User");
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id]);

  return (
    <div className="App">
      <Approutes />
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
