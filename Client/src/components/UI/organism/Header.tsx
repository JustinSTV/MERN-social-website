import { Link } from 'react-router-dom';
import { useUserContext } from "../../../context/User/useUserContext";

const Header = () => {

  const { state, logout } = useUserContext();

  return (
    <header>
      <nav>
        <h1>logo</h1>
        {state.user && (
          <div className="nav-links">
            <Link to="/feed">News Feed</Link>
            <Link to={`/profile/${state.user._id}`}>
              {state.user.firstName} Profile {/* veliau bus nuotrauka */}
            </Link>
          </div>
        )}
      </nav>
      <button onClick={() => logout()}>logout</button>
    </header>
  );
}
 
export default Header;