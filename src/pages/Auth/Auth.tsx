import React, { useState } from 'react';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);

    async function SignUp(email: string, password: string, name: string) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email, password,
                options: {
                    data: {
                        name
                    }
                }
            });
            if (error) {
                throw error;
            }

            return {
                success: true,
                message: "Signup successful. Please check your email for verification.",
                user: data.user
            }
        }
        catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "An error occured"
            }
        }
    }

    async function SignIn(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email, password
            })
            if (error) throw error;
            return {
                success: true,
                message: "Successfully Signed In",
                user: data.user,
                session: data.session
            }
        } catch (err) {
            return {
                success: false,
                message: err instanceof Error ? err.message : "An error occured !"
            }
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let response; if (isSignedUp) {
            setIsLoading(true);
            response = await SignIn(email, password);
        } else {
            setIsLoading(true);
            response = await SignUp(email, password, name)
        }
        setIsLoading(false);
        if (!response.success) {
            toast.error(response.message);
            return;
        }
        toast.success(`${isSignedUp ? 'Signed Up' : 'Signed In'} successfully!`);
        navigate('/profile');
        console.log(response);
    }

    return isLoading ? <div className="flex justify-center items-center p-4 h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div> : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignedUp ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isSignedUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        {isSignedUp ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <div
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={() => setIsSignedUp(prev => !prev)}
                    >
                        {isSignedUp
                            ? "Don't have an account? Sign Up"
                            : 'Already have an account? Login'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;