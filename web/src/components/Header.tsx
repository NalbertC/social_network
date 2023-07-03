import { useContext } from "react";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../contexts/auth";
import { DropdownMenu } from "./DropdownMenu";



export function Header() {
  const { user } = useContext(AuthContext);

  function handleSearch(e: any) {
    console.log(e.key);
  }

  return (
    <div className="  h-14 w-full flex justify-between items-center     ">

      <div className="w-full flex justify-center">
        <div className="max-w-[680px] w-full">
          {/* <InputSearch
            icon={<BsSearch />}
            placeholder="Buscar ..."
            onKeyUp={(e) => {
              handleSearch(e);
            }}
          /> */}
        </div>
      </div>

      <div className="w-[360px] flex justify-end gap-2 pr-4">
        <div className="h-10 w-10 rounded-full flex  items-center justify-center bg-colorSecondary">
          <FaBell size={22} />
        </div>
        <DropdownMenu name={user?.name!} url={user?.image} />
      </div>
    </div>
  );
}
