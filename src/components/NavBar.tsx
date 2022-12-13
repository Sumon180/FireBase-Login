import { Menu, Container, Button, Image } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import logo from "../assets/react.svg";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [button, setButton] = useState(true);
  const [logOutButton, setLogOutButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.href.includes("signup") ||
      window.location.href.includes("signin") ||
      window.location.href.includes("add")
    ) {
      setButton(false);
    } else {
      setButton(true);
    }
    if (
      window.location.href.includes("signup") ||
      window.location.href.includes("signin")
    ) {
      setLogOutButton(false);
    } else {
      setLogOutButton(true);
    }
  });

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/signup");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Menu
      inverted
      borderless
      style={{ padding: "0.3rem", marginBottom: "20px" }}
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Link to="/">
            <Image size="mini" src={logo} alt="logo" />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <h2>React Firebse CRUD with Upload Image</h2>
        </Menu.Item>
        <Menu.Item style={{ gap: "15px" }} position="right">
          {button && (
            <Button size="mini" primary onClick={() => navigate("/add")}>
              Add User
            </Button>
          )}
          {logOutButton && (
            <Button color="purple" onClick={handleLogOut}>
              Log Out
            </Button>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
