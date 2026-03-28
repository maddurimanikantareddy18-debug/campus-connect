import { useNavigate } from "react-router-dom";

function Navbar({ title }) {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">

      <h2 className="text-xl font-bold">{title}</h2>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;