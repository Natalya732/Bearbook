import { Button } from "@components/ui/button";
import { useApp } from "@contexts/AppContext";
import supabase from "@utils/supabase";
import React, { useState } from "react";
import { Loader } from "react-feather";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // ******************************* Integration ***************************************

  async function signUp() {
    try {
      let { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return null;
      }

      if (!data?.user) {
        toast.error("User signup failed. Please try again.");
        return null;
      }

      if (data?.user) {
        const { data: userData, error: userInsertError } = await supabase
          .from("User")
          .insert([
            {
              id: data.user.id,
              created_at: data.user.created_at,
              email: data.user.email,
              name: name,
            },
          ])
          .select();

        if (userInsertError) {
          toast.error(userInsertError.message);
          return null;
        }
        updateUser(data?.user);
        return userData;
      }
      return null;
    } catch (err) {
      console.error("Unexpected Error", err);
      toast.error("Something went wrong.Please try again.");
      return null;
    }
  }

  async function signIn() {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return null;
      }

      updateUser(data?.user);

      return null;
    } catch (err) {
      console.log("Unexpected Error", err);
      toast.error("Something went wrong. Please try again.");
      return null;
    }
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const selectedFn = isSignedUp ? signIn : signUp;
    setIsLoading(true);
    const res = selectedFn();
    setIsLoading(false);
    if (!res) return;
    navigate("/");
  }

  return isLoading ? (
    <div className="flex justify-center items-center p-4 h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignedUp ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignedUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isSignedUp ? "Login" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <div
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={() => setIsSignedUp((prev) => !prev)}
          >
            {isSignedUp
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
