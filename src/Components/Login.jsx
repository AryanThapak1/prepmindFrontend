// src/routes/Login.js

import { Link, Form, useActionData, useNavigate } from "react-router-dom";
import sideImage from "./../Items/Mobile login-amico.png";
import Input from "../utils/Input";
import { useRef } from "react";
import BASE_URL from "../utils/Constant";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(data);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    });

    if (!response.ok) {
      return { error: "Wrong email or password" };
    }

    const processedData = await response.json();
    const token = processedData.token;
    const role = processedData.role;

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);

    return { success: true };
  } catch (error) {
    return { error: "Login failed. Please try again." };
  }
}

export default function Login() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const emailRef=useRef();
  // Redirect on successful login
  if (actionData?.success) {
    navigate("/Profile");
  }

  return (
    <div className="flex">
      <div className="w-[50%] hidden md:block">
        <img src={sideImage} alt="illustration" />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form method="post" className="space-y-6">
          <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                 Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  required
                  placeholder="Email"
                  className="block w-full rounded-md border-0 px-4 py-1.5 bg-transparent outline-none text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
              </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/Forgot"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="block w-full rounded-md border-0 px-4 py-1.5 bg-transparent outline-none text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            {actionData?.error && (
              <p className="text-red-600">{actionData.error}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/Signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
