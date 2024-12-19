import BASE_URL from "../utils/Constant";
import MiniProfile from "../utils/MiniProfile";
import image from "./../Items/account.png";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const headers = [
    { display: "Full Name", key: "fullName" },
    { display: "College", key: "College" },
    { display: "Email", key: "email" },
    { display: "Mobile No", key: "Mobile" },
  ];

  const token = sessionStorage.getItem("token");

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const userData = await response.json();
    console.log(userData.data.user);

    const formattedData = {
      ...userData.data.user,
      fullName: `${userData.data.user.FirstName} ${userData.data.user.LastName}`,
    };

    setProfileData(formattedData);
  };

  const updateProfile = async () => {
    const response = await fetch(`${BASE_URL}/api/v1/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        FirstName: profileData.FirstName,
        LastName: profileData.LastName,
        College: profileData.College,
        email: profileData.email,
        Mobile: profileData.Mobile,
      }),
    });

    if (response.ok) {
      const updatedData = await response.json();
      setProfileData({
        ...updatedData.data.user,
        fullName: `${updatedData.data.user.FirstName} ${updatedData.data.user.LastName}`,
      });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (key, value) => {
    setProfileData((prevData) => ({ ...prevData, [key]: value }));
    console.log(profileData);
  };

  return (
    <div className="mx-[10%] mt-[5%] overflow-y-hidden">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white">
          Student Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-white">
          Personal details
        </p>
      </div>
      <div className="w-[50%] md:w-[10%] mx-auto">
        <img src={image} className="mx-auto max-w-full h-auto" alt="Profile" />
      </div>
      <div>
        <input type="file" className="text-white" />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {headers.map((el) => (
            <MiniProfile
              key={el.key}
              title={el.display}
              text={profileData[el.key]}
              isEditing={isEditing}
              onChange={(e) => handleChange(el.key, e.target.value)}
            />
          ))}
        </dl>
      </div>
      {isEditing ? (
        <button
          onClick={updateProfile}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Edit
        </button>
      )}
    </div>
  );
}
