"use client"
import Loading from "@/app/loading";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { useState, useEffect, Suspense } from "react";
type UserDetails = {
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhone: string;
  userCountry: string;
  userRole: number;
  userInstitute: string;
};

export default function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);

  useEffect(() => {
    fetchUserDetails()
      .then(data => setUserDetails(data))
      .catch(error => console.error("Error fetching user details:", error));
  }, []);

  async function fetchUserDetails(): Promise<UserDetails> {
    try {
      const url = process.env.JS_URI + "/user/getUser";
      const accessToken = getCookie("accessToken");
  
      if (!accessToken) {
        throw new Error('Please Login');
      }
  
      const dataPromise: Promise<UserDetails> = new Promise((resolve, reject) => {
        getRequest(url, accessToken, (data: UserDetails) => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error("Failed to fetch user details"));
          }
        });
      });
  
      const data = await dataPromise;
      return data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error("Error fetching user details");
    }
  }
  
  

  return (
    <>
    <Suspense fallback={Loading}>
      <div>
        <h1>User Details</h1>
        <p>User Name: {userDetails.userName}</p>
        <p>First Name: {userDetails.firstName}</p>
        <p>Last Name: {userDetails.lastName}</p>
        <p>Email: {userDetails.userEmail}</p>
        <p>Phone: {userDetails.userPhone}</p>
        <p>Country: {userDetails.userCountry}</p>
        <p>Role: {userDetails.userRole}</p>
        <p>Institute: {userDetails.userInstitute}</p>
      </div>
      </Suspense>
    </>
  );
}
