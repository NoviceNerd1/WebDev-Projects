import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userAPI } from "../services/api";
import UserForm from "../components/UserForm";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleSubmit = async (userData) => {
    try {
      await userAPI.updateUser(id, userData);
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit User</h1>
        <UserForm initialData={user} onSubmit={handleSubmit} isEdit />
      </div>
    </div>
  );
};

export default EditUserPage;
