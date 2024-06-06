import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const NumbersTable = ({ numbers }) => {
//   console.log(numbers);


  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">Sr. No.</th>
          <th className="border border-slate-600 rounded-md">First Name</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Last Name
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Phone Number
          </th>
          <th className="border border-slate-600 rounded-md">
            Create time
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {numbers.map((num, ind) => (
          <tr key={num.id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {ind + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {num.firstName}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {num.lastName}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {num.mobileNumber}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {moment(num.number).format("LLL")}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/number/details/${num.id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/number/edit/${num.id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/number/delete/${num.id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NumbersTable;
