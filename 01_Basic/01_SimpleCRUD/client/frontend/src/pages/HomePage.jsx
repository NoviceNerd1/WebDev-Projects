import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaUserPlus, FaDatabase } from "react-icons/fa";

const HomePage = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl text-primary-600" />,
      title: "Manage Users",
      description: "View, edit, and delete user records easily",
      link: "/users",
    },
    {
      icon: <FaUserPlus className="text-4xl text-primary-600" />,
      title: "Add New Users",
      description: "Create new user profiles with ease",
      link: "/add-user",
    },
    {
      icon: <FaDatabase className="text-4xl text-primary-600" />,
      title: "MongoDB Database",
      description: "Data stored securely in MongoDB",
      link: "/users",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to MERN CRUD Application
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A complete full-stack application demonstrating CRUD operations with
          MongoDB, Express, React, and Node.js
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <div className="flex justify-center space-x-4">
            <Link to="/users" className="btn-primary">
              View All Users
            </Link>
            <Link to="/add-user" className="btn-secondary">
              Add New User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
