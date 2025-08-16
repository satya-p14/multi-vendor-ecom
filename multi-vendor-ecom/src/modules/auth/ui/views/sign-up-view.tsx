"use client";
import React from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {toast} from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"]
});

const SignUpView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const registerVendor = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message || "An error occurred while registering");
        },
        onSuccess: () => {
            toast.success("Registration successful! Redirecting to home page...");
            router.push("/");
        }
    }));
    const form = useForm<z.infer<typeof SignUpSchema>>({
        mode: "all",
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        },
    });

    const onsubmit = (data: z.infer<typeof SignUpSchema>) => {
        console.log("Form submitted with data:", data);
        registerVendor.mutate(data);

    };

    const username = form.watch("username");
    const usernameError = form.formState.errors.username;
    const showPreview = username && !usernameError;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#f4f4f4] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className="flex flex-col gap-8 p-2 lg:p-4">
                        <div className="flex items-center justify-between">
                            <span className={cn("text-2xl font-bold", poppins.className)}>Multi vendor app</span>
                            {/* <span className="text-sm text-gray-500">Already have an account?</span> */}
                            <Button asChild variant="link" className="text-blue-500 hover:underline">
                                <Link href="/sign-in">
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                        <h1 className="text-4xl font-medium">
                            Join over 1000+ vendors earning more with us
                        </h1>
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription className={cn("hidden", showPreview && "block")} >
                                        your store will be available at <strong className="text-blue-500">{field.value}.example.com</strong>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit"
                            disabled={registerVendor.isPending}
                            size="lg"
                            variant="elevated"
                            className="w-full bg-black text-white hover:bg-pink-400 hover:text-primary transition-colors duration-200">
                            Create account
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="h-screen w-full lg:col-span-2 flex items-center justify-center hidden lg:block">
                Background column
            </div>
        </div>
    );
};

export default SignUpView;