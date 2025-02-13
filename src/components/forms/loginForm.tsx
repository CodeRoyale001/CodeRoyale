"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/ui/loading-btn";
import { useToast } from "@/components/ui/use-toast";
import { loginReq } from "@/utils/api";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, User, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setCookie } from "@/utils/cookies";
import { login } from "@/redux/slice";
import { useRouter } from "next/navigation";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const loginSchema = z.object({
  userEmail: z.string().min(1, { message: "Email or username is required" }),
  userPassword: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);

    try {
      const url = process.env.JS_URI + "/user/login";      
      await loginReq(url, values, "", (response) => {
        setCookie("accessToken", response.accessToken, 1);
        setCookie("refreshToken", response.refreshToken as any, 1);
        setCookie("userName", response.userName, 1);
        setCookie("userID", response.userId, 1);
        setCookie("userAvatar", response.userAvatar, 1);
        toast({
          title: "Welcome Back!",
          description: "You're logged in successfully",
        });
        dispatch(login(response.userName));
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Login Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="Enter your email or username"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-muted-foreground hover:text-foreground focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOpenIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeClosedIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} className="w-full" type="submit">
          Log In
        </LoadingButton>
      </form>
    </Form>
  );
}
