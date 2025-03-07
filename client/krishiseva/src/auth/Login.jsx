import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios"; 


const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: yup.string().oneOf(["Farmer", "Mentor", "Exporter"], "Invalid Role").required("Role is required"),
});

const Signup = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    
    const onSubmit = async (data) => {

        console.log("Signup button clicked!", data);

        try {

            console.log("Sending API request to http://localhost:8080/signup...");

            const response = await axios.post("http://localhost:8080/signup", data);

            console.log("API Response:", response.data);
            alert("Signup Successful!");

            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-[30%] min-h-[60%] bg-white p-6 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Signup</h1>

                {/* Name Input */}
                <input {...register("name")} type="text" placeholder="Name" className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-emerald-500" />
                <p className="text-red-500">{errors.name?.message}</p>

                {/* Email Input */}
                <input {...register("email")} type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-emerald-500" />
                <p className="text-red-500">{errors.email?.message}</p>

                {/* Password Input */}
                <input {...register("password")} type="password" placeholder="Password" className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-emerald-500" />
                <p className="text-red-500">{errors.password?.message}</p>

                {/* Role Selection */}
                <select {...register("role")} className="w-full border border-gray-300 p-3 rounded-md mb-5 focus:ring-2 focus:ring-emerald-500">
                    <option value="">Select Role</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Exporter">Exporter</option>
                </select>
                <p className="text-red-500">{errors.role?.message}</p>

                {/* Signup Button */}
                <button type="submit" className="w-full bg-emerald-600 text-white font-semibold p-3 rounded-md hover:bg-emerald-700 transition">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default Signup;
