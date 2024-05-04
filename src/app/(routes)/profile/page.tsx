"use client"
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

export default function Profile() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    role: "",
    institute: "",
  });

  useEffect(() => {
    fetchUserDetails()
      .then(data => setUserDetails(data))
      .catch(error => console.error("Error fetching user details:", error));
  }, []);

  async function fetchUserDetails() {
    try {
      const response = await fetch("http://localhost:5005/getUser");
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching user details");
    }
  }

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div>
        <h1>User Details</h1>
        <p>User Name: {userDetails.userName}</p>
        <p>First Name: {userDetails.firstName}</p>
        <p>Last Name: {userDetails.lastName}</p>
        <p>Email: {userDetails.email}</p>
        <p>Phone: {userDetails.phone}</p>
        <p>Country: {userDetails.country}</p>
        <p>Role: {userDetails.role}</p>
        <p>Institute: {userDetails.institute}</p>
      </div>
    </>
  );
}
