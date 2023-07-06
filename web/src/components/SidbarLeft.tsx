import { AiFillHome } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { DropdownMenu } from "./DropdownMenu";
import { Logo } from "./Logo";
import { Text } from "./Text";

interface SidbarLeftProps {}

export function SidbarLeft({}: SidbarLeftProps) {
  const { user } = useAuth();
  const { userProfile } = useProfile();
  const navigate = useNavigate();

  return (
    <aside className="aside-left flex flex-col">
      <div className="fixed h-screen">
        <header className="h-14 flex items-center px-4 ">
          <div className="aside-left-content px-2">
            <Logo />
          </div>
          <div className="aside-left-logo font-bold text-2xl px-3   rounded-full">
            r
          </div>
        </header>

        {/* l  */}
        <div
          className="flex flex-col pt-6 px-3  fixed justify-between h-full pb-20
        "
        >
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-1 w-full cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="h-12 flex items-center w-full hover:bg-card px-3 rounded-lg gap-2">
                <AiFillHome className="text-button" size={22} />
                <Text className="aside-left-content">Página Inicial</Text>
              </div>
            </div>

            <div
              className="flex gap-1 w-full cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <div className="h-12 flex items-center w-full hover:bg-card px-3 rounded-lg gap-2">
                {userProfile?.image?.url ? (
                  <img src={userProfile.image.url} className="h-6 w-6 rounded-full" />
                ) : (
                  <div className="" />
                )}

                <Text className="aside-left-content">{user?.name}</Text>
              </div>
            </div>
          </div>
          <div className="flex gap-1 w-full flex-col">
            <DropdownMenu>
              <div className="h-12 flex items-center w-full hover:bg-card px-3 rounded-lg gap-2">
                <FaBars size={22} />
                <Text className="aside-left-content">Mais</Text>
              </div>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </aside>
  );
}
