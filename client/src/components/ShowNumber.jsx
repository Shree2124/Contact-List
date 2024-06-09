import React, { useEffect, useState } from "react";
import { Spinner, BackBtn } from "./index.js";
import moment from "moment";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios"
import { APIString } from "../constants/APIString.js";

const ShowNumber = ({numbers}) => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState({});
  const {id} = useParams()

  const getData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${APIString}/get-number/${id}`);
      setNumber(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4">
      <BackBtn />
      <h3 className="text-3xl my-2">Details</h3>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-5">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{number.id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">First Name</span>
            <span>{number.firstName}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Name</span>
            <span>{number.lastName}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Number</span>
            <span>{number.mobileNumber}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{moment(number.createdAt).format("LLL")}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowNumber;
