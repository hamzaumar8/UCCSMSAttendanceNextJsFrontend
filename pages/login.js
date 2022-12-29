import ApplicationLogo from "../components/ApplicationLogo";
import AuthCard from "../components/AuthCard";
import AuthSessionStatus from "../components/AuthSessionStatus";
import Button from "../components/Button";
import GuestLayout from "../components/Layouts/GuestLayout";
import Input from "../components/Input";
import InputError from "../components/InputError";
import Label from "../components/Label";
import Link from "next/link";
import { useAuth } from "../src/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();

    // Auth Hook
    const { login, isLoading, user } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/dashboard",
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shouldRemember, setShouldRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset));
        } else {
            setStatus(null);
        }
    });

    // submit form
    const submitForm = async event => {
        event.preventDefault();
        setLoading(true);
        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
        setLoading(false);
    };

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <div className="py-8">
                    <h1 className="text-3xl font-bold text-black-text leading-tight">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-text">
                        Login to your account and view up to date attendance of
                        modules.
                    </p>
                </div>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm} autoComplete="off">
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end my-5">
                        <Link
                            href="/forgot-password"
                            className="underline text-sm text-primary font-bold hover:text-blue-800">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            loader={loading}>
                            Login
                        </Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    );
};

export default Login;

// Login.getLayout = function getLayout(page) {
//     return <GuestLayout>{page}</GuestLayout>;
// };
