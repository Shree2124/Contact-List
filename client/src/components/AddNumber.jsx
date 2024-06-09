import React, { useState } from "react";
import { BackBtn, Spinner, Errors } from "./index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { APIString } from "../constants/APIString.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const AddNumber = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dataSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    await axios
      .post(`${APIString}/add-number`, data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("Contact added successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Add Number</h1>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleSubmit(dataSubmit)}>
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
                  id="firstName"
                  // value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First Name"
                  className=" border-blue-300 p-2 border w-full"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <Errors error={errors.firstName.message} />
                )}
              </div>
              <div className="my-4">
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <input
                  type="text"
                  id="lastName"
                  // value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last Name"
                  className="border-blue-300 p-2 border w-full"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && <Errors error={errors.lastName.message} />}
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
                  id="mobileNumber"
                  type="number"
                  // value={number}
                  // onChange={(e) => {
                  //   setNumber(e.target.value);
                  // }}
                  placeholder="Number"
                  className="border-blue-300 p-2 border w-full"
                  required={true}
                  {...register("mobileNumber", {
                    required: "Number is required",
                    min: {
                      value: 6000000000,
                      message: "Number must be 10 digits",
                    },
                    max: {
                      value: 9999999999,
                      message: "Number must be 10 digits",
                    },
                    validate: (value) =>
                      !isNaN(value) || "Value must be a number",
                  })}
                />
                {errors.number && (
                  <Errors error={errors.mobileNumber.message} />
                )}
              </div>
            </div>
          </div>
          <div className="w-full justify-center flex">
            <button
              type="submit"
              className="bg-blue-400 rounded-xl px-4 py-2 text-xl text-gray-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNumber;
