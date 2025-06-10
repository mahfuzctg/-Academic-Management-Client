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
    <div className="group mx-auto bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 hover:border-transparent hover:ring-2 hover:ring-blue-400/50 hover:ring-offset-2 dark:hover:ring-blue-500/40">
      <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full max-h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
              {name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {title}
            </p>

            <div className="flex gap-4 text-gray-600 dark:text-gray-400 text-lg mb-4">
              <FaLinkedinIn className="cursor-pointer transition-colors duration-200 hover:text-blue-700 dark:hover:text-blue-400" />
              <FaFacebookF className="cursor-pointer transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-300" />
              <FaYoutube className="cursor-pointer transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400" />
            </div>

            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                {email}
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-blue-600 dark:text-blue-400" />
                {phone}
              </p>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {department}
            </p>
          </div>

          <button className="mt-5 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm shadow-md hover:shadow-lg transition-all duration-300 w-fit dark:from-blue-600 dark:to-indigo-600">
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
