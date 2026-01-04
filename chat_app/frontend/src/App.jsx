import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useCurrUser from "./customHooks/useCurrUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import useOtherUser from "./customHooks/useOtherUser.jsx";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "./main.jsx";
import { setOnlineUsers, setSocket } from "./redux/userSlice.js";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

function App() {
  useCurrUser();
  useOtherUser();
  let { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    if(userData){
    const socketio = io(`${serverUrl}`, {
      query: {
        userId: userData?._id,
      },
    });
    dispatch(setSocket(socketio))
    socketio.on("getOnlineUsers",(users)=>{
      dispatch(setOnlineUsers(users))
    })

    return ()=>socketio.close("getOnlineUsers")
  }else{
    if(socket){
      socket.close()
      dispatch(setSocket(null))
    }
  }
  }, [userData]);
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/profile" />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
