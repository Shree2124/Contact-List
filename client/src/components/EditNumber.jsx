import React, { useEffect, useState } from "react";
import { BackBtn, Errors, Spinner } from "./index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APIString } from "../constants/APIString.js";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

const EditNumber = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${APIString}/get-number/${id}`);
        const { firstName, lastName, mobileNumber, id: objId } = res.data;
        setValue("firstName", firstName);
        setValue("lastName", lastName);
        setValue("mobileNumber", mobileNumber);
        setValue("objId", objId);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id, setValue]);

  const handleDataSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.put(`${APIString}/edit-number/${data.objId}`, data);
      setLoading(false);
      enqueueSnackbar("Number Edited successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Edit Number</h1>
      {loading ? <Spinner /> : ""}
      <form onSubmit={handleSubmit(handleDataSubmit)}>
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
                  placeholder="First Name"
                  className="border-blue-300 p-2 border w-full"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <Errors error={errors.firstName.message} />
                )}
              </div>
              <div className="my-4">
                <input
                  type="text"
                  id="lastName"
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
                  placeholder="Number"
                  className="border-blue-300 p-2 border w-full"
                  {...register("mobileNumber", {
                    required: "Number is required",
                    minLength: {
                      value: 10,
                      message: "Number must be 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Number must be 10 digits",
                    },
                    validate: (value) =>
                      !isNaN(value) || "Value must be a number",
                  })}
                />
                {errors.mobileNumber && (
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

export default EditNumber;
