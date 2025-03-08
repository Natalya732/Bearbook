import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-400 mb-4">
        Hey! You reached to our app boundaries :)
      </h1>
      <p className="text-gray-600 mb-6">
        We couldn't find the page you're looking for.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Go Back{" "}
      </button>
    </div>
  );
};

export default ErrorPage;
