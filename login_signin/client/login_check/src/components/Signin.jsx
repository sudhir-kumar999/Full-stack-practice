import React, { useState } from "react";

const Signin = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(data)
    try {
      const res = await fetch("http://localhost:5001/user/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const data2 = await res.json();
      console.log("Response from backend:", data2);
      alert(data2);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  return (
    <div>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-auto w-max gap-1"
        >
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border rounded p-2"
            placeholder="Enter your name"
          />
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            id="age"
            name="age"
            value={data.age}
            onChange={handleChange}
            className="border rounded p-2"
            placeholder="Enter your age"
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="rounded border p-2"
            placeholder="Enter your Email"
          />
          <label htmlFor="pass">Password: </label>
          <input
            type="text"
            id="pass"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="rounded border p-2"
            placeholder="Enter your Password"
          />{" "}
          <br />
          <button type="submit" className="border p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
