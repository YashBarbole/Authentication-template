import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Generate Tokens
const generateAccessAndRefreshToken = async (loggedInUserId) => {
    try {
        const user = await User.findById(loggedInUserId);

        const accessToken = await user.generateAccessToken();  
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// ✅ Register User
const registerUser = asyncHandler(async (req, res) => {

    console.log("Received request body:", req.body); 
    
    const { name, email, password, role } = req.body;

    
    if ([name, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    
    const registeredUser = await User.findOne({
        $or: [{ name }, { email }]
    });

    if (registeredUser) {
        throw new ApiError(400, "User with this email or name already exists");
    }

    
    const user = await User.create({ name, email, password, role });

    
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    res.status(200).json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

// ✅ Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        throw new ApiError(400, "Name and password are required");
    }

    
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    
    const options = {
        httpOnly: true,
        secure: true
    };

    res
        .status(200)
        .cookie("accessToken", accessToken, options)  
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

// ✅ Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: "" }
        },
        { new: true }
    );

    
    res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
