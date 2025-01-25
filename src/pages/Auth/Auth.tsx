import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Chrome, Lock, ExternalLink } from 'react-feather';

const Auth: React.FC = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            // Google authentication logic will go here
            navigate('/profile');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div className="text-center">
                    <div className="mx-auto w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to continue to Social App
                    </p>
                </div>

                <div className="space-y-6">
                    <Button
                        className="w-full p-button-raised flex items-center border border-gradient-to-br from-blue-500 to-purple-600 justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg transition-colors"
                        onClick={handleGoogleSignIn}
                    >
                        <Chrome className="w-5 h-5" />
                        <span>Continue with Google</span>
                    </Button>

                </div>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        By continuing, you agree to our
                    </p>
                    <div className="mt-2 space-x-2 text-blue-600">
                        <a href="#" className="inline-flex items-center hover:text-blue-500">
                            Terms of Service
                            <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                        <span className="text-gray-400">•</span>
                        <a href="#" className="inline-flex items-center hover:text-blue-500">
                            Privacy Policy
                            <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-white">
                <p>Need help? Contact our support team</p>
            </div>
        </div>
    );
};

export default Auth;
