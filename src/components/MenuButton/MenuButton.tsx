import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const MenuButtonComponent: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout, loading } = useLogout();
  const navTo = (navPath: string) => {
    if (navPath == "/auth") {
      handleLogout();
    }
    navigate(navPath);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<IoMdMenu />}
        variant="outline"
        border={"none"}
      />
      <MenuList>
        <MenuItem onClick={() => navTo("/")}>Home</MenuItem>
        <MenuItem onClick={() => navTo("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navTo("/settings")}>Settings</MenuItem>
        <Button
          onClick={() => navTo("/auth")}
          background={"transparent"}
          isLoading={loading}
          width={"100%"}
          justifyContent={"flex-start"}
          borderRadius={0}
        >
          Log out
        </Button>
      </MenuList>
    </Menu>
  );
};

export default MenuButtonComponent;
