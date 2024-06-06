import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { Spinner, NumbersTable } from "../components/index.js";
import axios from "axios";
import { APIString } from "../constants/APIString.js";

const Home = () => {
  const [number,setNumber] = useState([])

  useEffect(() => {
    async function getAllNumbers(){
    try {
      const data = await axios.get(`${APIString}/get-all-numbers`);
      console.log(data.data);
      setNumber(data.data)
    } catch (error) {
      console.log(error);
    }
  }
  getAllNumbers()
  }, []);
  // console.log(number);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="my-8 text-3xl">Contact List</h3>
          <Link to="/number/add">
            <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
          </Link>
        </div>
        {loading ? <Spinner /> : <NumbersTable numbers={number} />}
      </div>
    </>
  );
};

export default Home;
