import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserForm = ({ initialData, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    age: initialData?.age || "",
    city: initialData?.city || "",
  }));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: initialData.name ?? "",
      email: initialData.email ?? "",
      age: initialData.age ?? "",
      city: initialData.city ?? "",
    }));
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "To Short password";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 0 || formData.age > 150) {
      newErrors.age = "Age must be between 0 and 150";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    // Convert age to number
    const submitData = {
      ...formData,
      age: parseInt(formData.age),
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
          placeholder="Enter full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
          placeholder="Enter email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={`input-field ${errors.age ? "border-red-500 focus:ring-red-500" : ""}`}
          placeholder="Enter password"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age *
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={`input-field ${errors.age ? "border-red-500 focus:ring-red-500" : ""}`}
          placeholder="Enter age"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`input-field ${errors.city ? "border-red-500 focus:ring-red-500" : ""}`}
          placeholder="Enter city"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>

      <div className="flex space-x-4 pt-4">
        <button type="submit" className="btn-primary flex-1">
          {isEdit ? "Update User" : "Create User"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
