import { useEffect, useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";

import { Button } from "../components/Button";
import { CardPost } from "../components/CardPost";
import { Heading } from "../components/Heading";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { Post } from "./Home";

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  const { logout, user } = useAuth();
  const [post, setPost] = useState<Post[]>([]);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/posts/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(data);
      setPost(data);
    })();
  }, []);

  return (
    <Page>
      <div className="w-full flex flex-row justify-center ">
        <div className="max-w-[1218px] w-full flex flex-col">
          {/* perfil  */}
          <header className="flex flex-row gap-6 w-full py-4 items-stretch h-48 bg-card px-4 ">
            <div className="rounded-full h-40 w-40 relative  ">
              <img src={user?.image} alt="" className="rounded-[inherit]" />

              <div className="bg-card h-10 w-10 rounded-full absolute bottom-0 right-0 mr-2 mb-2 border-cardHover border flex items-center justify-center cursor-pointer">
                <FaCamera size={20} />
              </div>
            </div>

            <div className="flex flex-row gap-8 flex-1 rounded-lg justify-between">
              <div className="flex flex-col justify-between">
                <div>
                  <Heading className=" ">{user?.name}</Heading>
                  <Text className=" ">{user?.username}</Text>
                </div>
                <Button className="bg-cardHover" icon={<FaEdit />}>
                  Editar perfil
                </Button>
              </div>
            </div>
          </header>

          {/* content  */}

          <main className="w-full flex flex-row justify-center ">
            <article className="max-w-[680px] w-full">
              <div className="flex flex-col items-center gap-4">
                {post.map((post, i) => (
                  <CardPost
                    id={post.id}
                    likes={post.likes}
                    userImage={post.User.image?.url}
                    userPost={post.User.name}
                    key={`iten-${i}`}
                    img={post.image.url}
                    legend={post.legend}
                    created_at={post.created_at}
                  />
                ))}
              </div>
            </article>
          </main>
        </div>
      </div>
    </Page>
  );
}
