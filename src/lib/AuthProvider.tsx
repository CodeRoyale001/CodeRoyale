// components/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slice";
import { getCookie } from "@/utils/cookies";
import { getNewAccessToken } from "@/utils/api";
import { isTokenExpired } from "@/utils/tokens";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/loading";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const autoAuthenticate = async () => {
      setIsLoading(true);
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");

      if (accessToken && !isTokenExpired(accessToken)) {
        const userName = getCookie("userName");
        dispatch(login(userName));
      } else if (refreshToken) {
        const response = await getNewAccessToken(refreshToken);
        if (response?.accessToken) {
          dispatch(login(response.userName));
        } else {
          toast({
            title: "Auto Login Unsuccessful",
            description:
              "Your session couldn't be started automatically. Please log in manually to proceed.",
          });
        }
      }
      setIsLoading(false);
    };

    autoAuthenticate();
  }, [dispatch, toast]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthProvider;
