import React, { useEffect, useState } from "react";
import { BackBtn, Spinner } from "./index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APIString } from "../constants/APIString.js";
import { useSnackbar } from 'notistack'

const EditNumber = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [objId,setObjId] = useState()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${APIString}/get-number/${id}`)
        .then((res) => {
          console.log(res.data);
          setFirstName(res.data['firstName'])
          setLastName(res.data['lastName'])
          setNumber(res.data['mobileNumber'])
          setObjId(res.data['id'])
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const handleSubmit = async() => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: number,
    };
    setLoading(true)
    console.log(data);
      await axios
        .put(`${APIString}/edit-number/${objId}`, data)
        .then(() => {
          setLoading(false)
          console.log("Success");
          enqueueSnackbar('Number Edited successfully',{variant: 'success'})
          navigate("/")
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
          enqueueSnackbar('Error',{variant: 'error'})
          console.log("Error");
        });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Edit Number</h1>
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

export default EditNumber;
