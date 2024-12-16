import React, { useDebugValue, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';
import Loader from "../components/Loader"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData( (prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
    }) )
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // dispatch
    dispatch(login(formData, navigate))

    // reset
    setFormData({
        email: "",
        password: ""
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

                {/* Centered Log in button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-900 font-medium rounded-lg px-5 py-2.5 text-center"
                  >
                    Log In
                  </button>
                </div>

                {/* Centered text for the login link */}
                <div className="flex justify-center">
                  <p className="text-sm font-light text-gray-500">
                    No account?{" "}
                    <Link to="/" className="font-medium text-blue-600 hover:underline">
                      Signup here
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
}

export default Login;
