import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon.jsx";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import image from "../../assets/logo.png";

const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const handleLogout = () => {
  try {
    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error);
    // Display an error message to the user or take appropriate action
  }
};

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const name = decodedToken ? decodedToken.name : "Guest";
  const isLoggedIn = !!decodedToken;

  // Hide Navbar on login and registration pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    !hideNavbar && (
      <Navbar isBordered variant="floating">
        <NavbarContent className="sm:hidden">
          <NavbarMenuToggle />
        </NavbarContent>
        <NavbarContent className="sm:hidden pr-8" justify="start">
          <Link href="/home">
            <img src={image} alt="NASA" className="h-32 w-32 mr-10" />
          </Link>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-7" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/home">
              <img src={image} alt="NASA" className="h-32 w-32 mt-2" />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/home">
              HOME
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/apod">
              APOD
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/rover">
              ROVER
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/notifications">
              NOTIFICATIONS
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[12rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform ml-4"
                color="primary"
                name={name}
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Signed in as {name}</DropdownItem>
              {isLoggedIn && (
                <DropdownItem onClick={handleLogout}>
                  <span className="text-red-500">Logout</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Link href="/">Home</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/apod">APOD</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/rover">Rover</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/notifications">Notifications</Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    )
  );
}
