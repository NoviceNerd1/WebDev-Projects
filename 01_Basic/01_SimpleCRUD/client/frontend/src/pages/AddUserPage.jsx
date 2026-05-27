import React from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../services/api";
import UserForm from "../components/UserForm";
import toast from "react-hot-toast";

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      await userAPI.createUser(userData);
      toast.success("User created successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New User</h1>
        <UserForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddUserPage;
