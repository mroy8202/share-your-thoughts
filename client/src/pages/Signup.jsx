import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/operations/authAPI";
import Loader from "../components/Loader"

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const {email, password, confirmPassword} = formData;

  const handleOnChange = (e) => {
    setFormData( (prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }) )
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // dispatch
    dispatch(signup(formData, navigate));

    // reset
    setFormData({
      email: "",
      password: "",
      confirmPassword: ""
    })
  }

  return (
    <div>
      {Loading ? (
        <Loader />
      ): (
        <section className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto">
          {/* Welcome message */}
          <p className="mb-6 text-2xl font-semibold text-gray-600">Welcome back</p>

          {/* Form container with white background, shadow, and rounded corners */}
          <div className="w-full bg-white rounded-lg shadow border max-w-md">
            <div className="p-6 space-y-4">
              {/* Form start */}
              <form className="space-y-4" onSubmit={handleOnSubmit}>
                
                {/* Email input field */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter your email..."
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Password input field */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                    autoComplete="password"
                    required
                  />
                </div>

                {/* Confirm password input field */}
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2.5"
                    autoComplete="confirmPassword"
                    required
                  />
                </div>

                {/* Centered Sign Up button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-900 font-medium rounded-lg px-5 py-2.5 text-center"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Centered text for the login link */}
                <div className="flex justify-center">
                  <p className="text-sm font-light text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>

    
  );
};

export default SignUp;
