import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCity,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const UserCard = ({ user, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 rounded-full p-3">
              <FaUser className="text-primary-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500">ID: {user._id.slice(-6)}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/edit-user/${user._id}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Edit"
            >
              <FaEdit size={18} />
            </Link>
            <button
              onClick={() => onDelete(user._id)}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Delete"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <FaEnvelope className="mr-3 text-gray-400" />
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCity className="mr-3 text-gray-400" />
            <span className="text-sm">{user.city}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-3 text-gray-400" />
            <span className="text-sm">Age: {user.age} years</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/user/${user._id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
