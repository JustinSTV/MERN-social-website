import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";

import Logo from "../molecule/Logo";

const Header = () => {
  const { state, logout } = useUserContext();

  return (
    <header className="bg-secondary-800 text-white px-6 py-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Logo size="sm" />
        {state.user && (
          <div className="flex items-center gap-6">
            <Link to="/feed">News Feed</Link>
            <Link to={`/profile/${state.user._id}`}>
              {state.user.firstName} Profile {/* veliau bus nuotrauka */}
            </Link>
          </div>
        )}
        <button onClick={() => logout()}>logout</button>
      </nav>
    </header>
  );
};

export default Header;
