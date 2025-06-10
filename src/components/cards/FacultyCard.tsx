import type { FC } from "react";

import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";

type Faculty = {
  name: string;
  title: string;
  email: string;
  phone: string;
  department: string;
  image: string;
};

const FacultyCard: FC<Faculty> = ({
  name,
  title,
  email,
  phone,
  department,
  image,
}) => {
  return (
    <div className="bg-white shadow border rounded-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4">
      <img
        src={image}
        alt={name}
        className="w-full md:w-40 h-48 object-cover rounded"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex gap-3 mt-2 text-gray-600 text-lg">
            <FaLinkedinIn />
            <FaFacebookF />
            <FaYoutube />
          </div>
          <div className="mt-2 text-sm">
            <p className="flex items-center gap-2">
              <FaEnvelope /> {email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> {phone}
            </p>
          </div>
          <p className="text-sm mt-2 text-gray-600">{department}</p>
        </div>
        <button className="mt-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded text-sm w-fit">
          More Details
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
