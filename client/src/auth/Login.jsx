import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Validation schema
const schema = yup.object().shape({
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/auth/login", data);
            console.log("Login response:", response.data);  
            console.log("User data:", response.data?.data?.user);  
            console.log("User role:", response.data?.data?.user?.role);  
            alert("Login Successful");
    
            const userRole = response.data?.data?.user?.role; 
    
            if (userRole === "farmer") {
                navigate("/farmer-dashboard");
            } else if (userRole === "mentor") {
                navigate("/mentor-dashboard");
            } else {
                navigate("/exporter-dashboard");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[27%] min-h-[55%] bg-white p-8 shadow-xl rounded-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>

                <div className="mb-4">
                    <input type="email" placeholder="Enter your email" className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-emerald-500" {...register("email")} />
                    <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                </div>

                <div className="mb-6">
                    <input type="password" placeholder="Enter your password" className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-emerald-500" {...register("password")} />
                    <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                </div>

                <button type="submit" className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-md hover:bg-emerald-700 transition">
                    Login
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")} className="text-emerald-600 cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;