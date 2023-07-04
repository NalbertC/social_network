import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { Text } from "./Text";

interface DropProps {
  children: ReactNode;
}
export const DropdownMenu = ({ children }: DropProps) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>{children}</Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content className="bg-card flex flex-col rounded-[12px] ml-3 min-w-[240px] ">
          <Dropdown.Item
            className="h-10 pl-3 rounded-md flex flex-row items-center m-1 cursor-pointer hover:text-gray-200   hover:bg-cardHover focus:shadow-0 focus:outline-0"
            onClick={() => navigate("/meuperfil")}
          >
            <Text>Meu Perfil</Text>
          </Dropdown.Item>

          <Dropdown.Separator className="h-[1px] bg-cardHover mx-2" />

          <Dropdown.Item
            className="h-10 pl-3 rounded-md flex flex-row items-center m-1 cursor-pointer hover:text-gray-200  hover:bg-cardHover focus:shadow-0 focus:outline-0"
            onClick={() => logout()}
          >
            <Text>Sair</Text>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
