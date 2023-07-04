import { FaCamera, FaEdit } from "react-icons/fa";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { useAuth } from "../hooks/useAuth";

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  const { user } = useAuth();

  return (
    <Page>
      <div className="w-full flex flex-row justify-center ">
        <div className="max-w-[1218px] w-full flex flex-col ">
          {/* perfil  */}
          <div className="flex flex-row gap-6 w-full py-4 items-end h-48">
            <div className="flex flex-row gap-8 flex-1 h-2/3 bg-card px-4 rounded-lg">
              <div className="rounded-full h-36 w-36 relative -translate-y-1/3">
                <img src={user?.image} alt="" className="rounded-[inherit]" />

                <div className="bg-card h-10 w-10 rounded-full absolute bottom-0 right-0 mr-2 mb-2 border-cardHover border flex items-center justify-center cursor-pointer">
                  <FaCamera size={20} />
                </div>
              </div>

              <div className="flex flex-row justify-between flex-1 pb-2">
                <div className="flex flex-col justify-between">
                  <div>
                    <Heading className=" ">{user?.name}</Heading>
                    <Text className=" ">{user?.username}</Text>
                  </div>
                  <div className="h-9 "></div>
                </div>
                <div className=" flex items-end">
                  <Button className="bg-card" icon={<FaEdit/>}>
                    Editar perfil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
