
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-covrzy-purple mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for.</p>
      <Link to="/">
        <Button className="bg-covrzy-purple hover:bg-purple-700">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
