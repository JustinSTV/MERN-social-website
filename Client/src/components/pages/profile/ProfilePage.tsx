import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { state } = useUserContext();

  const isOwnProfile = state.user?._id === userId;

  return (
    <section>
      <h1>profile</h1>
      {
        state.user && (
          <div>
            <h2>{state.user.firstName} {state.user.lastName}</h2>
            <p>{state.user.email}</p>
            {isOwnProfile && (
              <button>edit profile</button>
            )}
          </div>
        )
      }
    </section>
  );
}
 
export default ProfilePage;