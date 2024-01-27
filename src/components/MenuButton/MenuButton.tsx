import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MenuButtonComponent: React.FC = () => {
  const navigate = useNavigate();
  const navTo = (navPath: string) => {
    navigate(navPath);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<IoMdMenu />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={() => navTo("/")}>Home</MenuItem>
        <MenuItem onClick={() => navTo("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navTo("/settings")}>Settings</MenuItem>
        <MenuItem onClick={() => navTo("/auth")}>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuButtonComponent;
