import { useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <div className="flex-column justify-center align-center min-100-vh bg-primary">
      <h1 className="text-white">
        No match for <code>{location.pathname}</code>
      </h1>
    </div>
  );
}

export default NotFound;