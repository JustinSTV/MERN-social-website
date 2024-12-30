import { Outlet } from "react-router-dom";
import Header from "../UI/organism/Header";

const MainOutlet = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
 
export default MainOutlet;