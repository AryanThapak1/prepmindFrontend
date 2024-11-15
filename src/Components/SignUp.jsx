import sideImage from "./../Items/6310507.png";
import Input from "../utils/Input";
import { useRef, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/Constant";
import { redirect } from "react-router-dom";

export const signupAction = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    FirstName: formData.get("FirstName"),
    LastName: formData.get("LastName"),
    userName: formData.get("Username"),
    email: formData.get("Email"),
    Password: formData.get("Password"),
    College: formData.get("College"),
    Mobile: formData.get("Mobile"),
    role: "user", // Default role as "user"
  };

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: "Invalid email format." };
  }

  // Mobile number regex validation (10-digit number check)
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(data.Mobile)) {
    return { error: "Invalid mobile number format. Must be 10 digits." };
  }

  // Password length validation
  if (data.Password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  // Send signup data to the backend
  const response = await fetch(`${BASE_URL}/api/v1/user/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return { error: "Failed to sign up. Please try again." };
  }

  // Redirect to login page after successful signup
  return redirect("/Login");
};

export default function Signup() {
  const actionData = useActionData(); // Retrieve any errors or responses from action
  const [debounce, setDebounce] = useState(false);
  const disabledClass = debounce ? "disabled:cursor-not-allowed" : "";
  return (
    <div className="flex">
      <div className="w-[50%] hidden md:block">
        <img src={sideImage} alt="illustration" />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign Up for Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="post" action="/signup">
            {/* First Name Field */}
            <Input
              htmlFor="FirstName"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 bg-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6"
              type="text"
              placeholder="First Name"
              name="FirstName"
              required
            />

            {/* Last Name Field */}
            <Input
              htmlFor="LastName"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="text"
              placeholder="Last Name"
              name="LastName"
              required
            />

            {/* Username Field */}
            <Input
              htmlFor="Username"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="text"
              placeholder="Username"
              name="Username"
              required
            />

            {/* Email Field */}
            <Input
              htmlFor="Email"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="email"
              placeholder="Email"
              name="Email"
              required
            />

            {/* Mobile Number Field */}
            <Input
              htmlFor="Mobile"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="text"
              placeholder="Mobile"
              name="Mobile"
              required
            />

            {/* College Field */}
            <Input
              htmlFor="College"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="text"
              placeholder="College"
              name="College"
              required
            />

            {/* Password Field */}
            <Input
              htmlFor="Password"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="password"
              placeholder="Password"
              name="Password"
              required
            />

            {/* Confirm Password Field */}
            <Input
              htmlFor="ConfirmPassword"
              labelClasses="block text-sm font-medium leading-6 text-gray-900 text-white"
              inputClasses="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 outline-none sm:text-sm sm:leading-6 bg-transparent"
              type="password"
              placeholder="Confirm Password"
              name="ConfirmPassword"
              required
            />

            {/* Error Message */}
            {actionData?.error && (
              <p className="text-red-600">{actionData.error}</p>
            )}

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${disabledClass}`}
              >
                Sign up
              </button>
            </div>
          </Form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
