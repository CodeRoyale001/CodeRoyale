import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getCookie } from "@/utils/cookies";
import { login } from "@/redux/slice";
import { getNewAccessToken } from "@/utils/api";
import { isTokenExpired } from "@/utils/tokens";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/app/loading";

type DispatchType = (action: any) => void;

const autoAuthenticate = async (
	dispatch: DispatchType,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	toast: any
) => {
	setIsLoading(true); // Start loading
	const accessToken = getCookie("accessToken");
	const refreshToken = getCookie("refreshToken");

	if (accessToken && !isTokenExpired(accessToken)) {
		const userName = getCookie("userName");
		dispatch(login(userName));
	} else if (refreshToken) {
		const response = await getNewAccessToken(refreshToken);
		console.log(response);

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

	setIsLoading(false); // End loading
};

const useAuthEffect = (
	dispatch: DispatchType,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	toast: any
) => {
	useEffect(() => {
		autoAuthenticate(dispatch, setIsLoading, toast);
	}, [dispatch, setIsLoading, toast]);
};

export const useAuthenticate = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	return function AuthenticateComponent(props: P) {
		const dispatch = useDispatch<AppDispatch>();
		const { toast } = useToast();
		const [isLoading, setIsLoading] = useState<boolean>(true);

		useAuthEffect(dispatch, setIsLoading, toast);

		if (isLoading) {
			return <Loading />;
		}

		return <WrappedComponent {...props} />;
	};
};
