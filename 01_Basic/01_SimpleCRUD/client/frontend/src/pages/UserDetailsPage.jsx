import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userAPI } from "../services/api";
import {
  FaUser,
  FaEnvelope,
  FaCity,
  FaCalendarAlt,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import ConfirmationModal from "../components/ConfirmationModal";
import toast from "react-hot-toast";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUserById(id);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await userAPI.deleteUser(id);
      toast.success("User deleted successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          to="/users"
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Users
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-4">
                <FaUser className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-primary-100">User ID: {user._id}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/edit-user/${user._id}`}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              >
                <FaEdit size={20} />
              </Link>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded-lg transition-colors"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center border-b pb-3">
                <FaEnvelope className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center border-b pb-3">
                <FaCity className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium">{user.city}</p>
                </div>
              </div>

              <div className="flex items-center border-b pb-3">
                <FaCalendarAlt className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{user.age} years</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">
                  Account Information
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Created:</span>{" "}
                    {formatDate(user.createdAt)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Updated:</span>{" "}
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserDetailsPage;
