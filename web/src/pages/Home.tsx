import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { CardPost } from "../components/CardPost";
import { MainContent } from "../components/MainContent";
import { Page } from "../components/Page";
import { SidbarRigth } from "../components/SidbarRigth";
import { AuthContext } from "../contexts/auth";
import { api } from "../services/api";

export interface Post {
  id: string;
  created_at: Date;
  legend?: string;
  image: Image;
  User: User;
  likes: Like[];
}

interface Image {
  id: string;
  url: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  image?: Image;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  created_at: Date;
}

export function dateFarmater(date: Date) {
  const formater = dayjs(date).locale("pt-br").format("DD/MM/YYYY HH:mm");
  return formater;
}

export function Home() {
  const { logout, user } = useContext(AuthContext);
  const [post, setPost] = useState<Post[]>([]);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPost(data);
    })();
  }, []);

  return (
    <Page>
      <MainContent>
        <div className="w-full flex flex-row justify-center ">
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
        </div>
        <SidbarRigth />
      </MainContent>
    </Page>
  );
}
