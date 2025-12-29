import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    try{
        const res = await fetch("http://localhost:5001/user/login",{
            method:"POST",
            headers:{
                "content-type":"application/JSON"
            },
            credentials: "include",
            
            body:JSON.stringify(data)
        })
        const data2 = await res.json()
        console.log("from backend" , data2)
        alert(data2)
        if(data2.success){
          navigate("/user/dashboard")
        }

    }catch(err){
        console.log(err)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center gap-2 h-[90vh] ">
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          id="email"
          name="email"
          value={data.email}
          className="border rounded p-2"
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password : </label>
        <input
          type="text"
          id="password"
          name="password"
          value={data.password}
          className="border rounded p-2"
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        <button type="submit" className="border px-2 py-1 rounded-lg m-2">
          Submit
        </button>
      </div>
      </form>
    </div>
  );
};

export default Login;
