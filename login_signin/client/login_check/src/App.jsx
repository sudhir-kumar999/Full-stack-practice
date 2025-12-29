import { Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Login from "./components/Login"
import Signin from "./components/Signin"
import About from "./pages/About"
import Footer from "./pages/Footer"
import Dashboard from "./layout/Dashboard"


function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signin" element={<Signin/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="footer" element={<Footer/>}/>
        
        </Route>
        <Route path="/user/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App
