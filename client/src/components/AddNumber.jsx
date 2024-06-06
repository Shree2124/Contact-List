import React, { useState } from "react";
import { BackBtn, Spinner } from "./index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { APIString } from "../constants/APIString.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'

const AddNumber = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  // console.log(firstName);
  const handleSubmit = async (e) => {
    console.log("inside handleSubmit");
    // e.preventdefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: number,
    };
    setLoading(true)
    console.log(data);
      await axios
        .post(`${APIString}/add-number`, data)
        .then(() => {
          setLoading(false)
          console.log("Success");
          enqueueSnackbar('Number added successfully',{variant: 'success'})
          navigate("/")
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
          enqueueSnackbar('Something went wrong',{variant: 'error'})
          console.log("Error");
        });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Add Number</h1>
      {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600] p-4 mx-auto">
          <div className="flex w-full">
            <div>
              <span className="relative top-5 block">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </span>
            </div>
            <div className="w-full ml-4">
              <div className="my-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First Name"
                  className=" border-blue-300 p-2 border w-full"
                />
              </div>
              <div className="my-4">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last Name"
                  className="border-blue-300 p-2 border w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div>
              <span className="relative top-5 block">
                <FontAwesomeIcon icon={faSquarePhone} size="2x" />
              </span>
            </div>
            <div className="w-full ml-4">
              <div className="my-4">
                <input
                  type="number"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  placeholder="Number"
                  className="border-blue-300 p-2 border w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full justify-center flex">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-400 rounded-xl px-4 py-2 text-xl text-gray-700"
            >
              Save
            </button>
          </div>
        </div>
    </div>
  );
};

export default AddNumber;
