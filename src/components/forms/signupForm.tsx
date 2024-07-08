"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoadingButton } from "@/components/ui/loading-btn"
import { useToast } from "@/components/ui/use-toast"
import { loginReq } from "@/utils/api"
import { useState } from "react"
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  userName: z.string().min(2).max(50),
  userEmail: z.string().email(),
  userPhone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  userPassword: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  ),
  confirmUserPassword: z.string(),
}).refine(data => data.userPassword === data.confirmUserPassword, {
  message: "Passwords don't match",
  path: ["confirmUserPassword"],
});

export function SignUpForm() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPhone: "",
      userPassword: "",
      confirmUserPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const signupData = {
      userName: values.userName,
      userEmail: values.userEmail,
      userPhone: values.userPhone,
      userPassword: values.userPassword,
    };
    setLoading(true);


    try {
      const url = process.env.JS_URI + "/user/signup";
      await loginReq(
        url,
        signupData,
        "",
        (response) => {
          toast({
            title: "You're In!",
            description: "Signup successful. Please log in to continue.",
          });
        }
      );
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
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
                  <Input type={showPassword ? "text" : "password"} placeholder="Your password" {...field} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOpenIcon className="h-5 w-5" aria-hidden="true" /> : <EyeClosedIcon className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmUserPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
              <div className="relative">
                  <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" {...field} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOpenIcon className="h-5 w-5" aria-hidden="true" /> : <EyeClosedIcon className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} className="w-full" type="submit">Sign Up</LoadingButton>
        {/* <Button  className="w-full" type="submit">Sign Up</Button>} */}
      </form>
    </Form>
  );
}
