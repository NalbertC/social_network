import { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { AuthContext } from "../contexts/auth";
import { Logo } from "./Logo";
import { Text } from "./Text";

interface SidbarLeftProps {}

export function SidbarLeft({}: SidbarLeftProps) {
  const { user } = useContext(AuthContext);
  return (
    <aside className="aside-left flex flex-col ">
      <div className="fixed">
        <header className="h-14 flex items-center px-4">
          <div className="aside-left-content px-2">
            <Logo />
          </div>
          <div className="aside-left-logo font-bold text-2xl px-3   rounded-full">
            r
          </div>
        </header>
        <div
          className="flex flex-col pt-6 px-3 gap-2  h-full fixed
        "
        >
          <div className="flex gap-1 w-full">
            <div className="h-12 flex items-center w-full hover:bg-card px-3 rounded-lg gap-2">
              <AiFillHome className="text-button" size={22} />
              <Text className="aside-left-content">Página Inicial</Text>
            </div>
          </div>

          <div className="flex gap-1 w-full">
            <div className="h-12 flex items-center w-full hover:bg-card px-3 rounded-lg gap-2">
              {user?.image ? (
                <img src={user.image} className="h-6 w-6 rounded-full" />
              ) : (
                <div className="" />
              )}

              <Text className="aside-left-content">{user?.name}</Text>
            </div>
          </div>

          <div className="h-[2px] w-full bg-card" />
        </div>
      </div>
    </aside>
  );
}
