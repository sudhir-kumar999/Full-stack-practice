import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";

const Rest = () => {
  const [result, setResult] = useState([]);

  async function fetchData() {
    const res = await fetch("http://localhost:7000/rest/read", {
      method: "GET",
      "content-Type": "application/json",
    });
    const data = await res.json();
    setResult(data.data);
  }

  useEffect(() => {
  fetchData();
}, []);


  const obj = {
    name: "Bluetooth Speaker",
    price: 2999,
    rating: 4.3,
    description:
      "Portable Bluetooth speaker with deep bass and long battery life.",
    image: "https://images.unsplash.com/photo-1585386959984-a4155228b9b4",
  };

  async function postData() {
    let res = await fetch("http://localhost:7000/rest/post", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    await res.json()
    fetchData()
  }

  if (result.length == 0) {
    return (
      <>
        <Shimmer />
        <div className="">
          <button
            onClick={() => fetchData()}
            className="border px-3 py-2 rounded"
          >
            Get Data
          </button>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap justify-center place-content-center h-[100vh]">
        {result.map((ele) => (
          <div className="border h-[200px] w-[200px]" key={ele._id}>
            <div>
              <img src={ele.image} alt="" className="h-[200px] w-[200px]" />
            </div>
            <div>
              <h2>{ele.name}</h2>
            </div>
            <div>
              
            </div>
          </div>
        ))}
      </div>
      <button className="border px-3 py-2 rounded" onClick={() => postData()}>
        POST
      </button>
    </div>
  );
};

export default Rest;
