import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 bg-gray-100">
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/restaurants">Restaurants</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/packages"} as={"div"}>
          <Link to="/res-pkg">Packages</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
