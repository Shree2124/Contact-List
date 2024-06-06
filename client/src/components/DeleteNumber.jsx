import React, { useState } from "react";
import { BackBtn, Spinner } from "./index.js";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { APIString } from "../constants/APIString.js";

const DeleteNumber = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteNumber = () => {
    setLoading(true);
    axios
      .delete(`${APIString}/delete-number/${id}`)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("Contact Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You Sure You want to delete this contact?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteNumber}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteNumber;
