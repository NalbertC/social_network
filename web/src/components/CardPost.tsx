import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useAuth } from "../hooks/useAuth";
import { Like, Post, dateFarmater } from "../pages/Home";
import { api } from "../services/api";

interface CardPostProps {
  id: string;
  img: string;
  legend?: string;
  userPost: string;
  userImage?: string;
  created_at: Date;
  likes: Like[];
}

export function CardPost({
  id,
  img,
  legend,
  created_at,
  userPost,
  userImage,
  // likes,
}: CardPostProps) {
  const { user } = useAuth();

  const [post, setPost] = useState<Post>({} as Post);

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    (async () => {
      api.interceptors.request.use(
        function (config) {
          const token = localStorage.getItem("token");
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

      const { data } = await api.get(`/posts/post/${id}`);
      setPost(data);
    })();
  }, [id, isLike]);

  async function like(postId: string) {
    const { data } = await api.patch(`/like/${postId}`);
    setIsLike(!isLike);

    console.log(data);
  }

  return (
    <div className="bg-[#242526] w-full max-w-[580px] rounded-lg  mt-4">
      {/* header card */}
      <div className="h-14 flex items-center px-4">
        <div className="flex gap-2 items-center h-12">
          <div className="h-10 w-10 rounded-full bg-slate-600">
            <img
              src={post.User?.image?.url}
              alt=""
              className="rounded-[inherit]"
            />
          </div>
          <div className="h-11 flex flex-col">
            <span className="font-bold text-[16px] hover:underline ">
              {post.User?.name}
            </span>
            <span className="hover:underline text-[12px] text-textSecondary">
              {dateFarmater(post?.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* post */}
      <div className="flex flex-col">
        <div className="px-4">{post.legend}</div>
        <div className=" w-full flex items-center border-y border-colorSecondary justify-center mt-2">
          <img src={post.image?.url} className="h-full" />
        </div>
      </div>

      {/* footer  */}

      <div className="px-4 text-textSecondary">
        <div className="h-8 border-b border-colorSecondary flex items-center justify-between">
          <div className="flex items-center gap-1 ">
            {post.likes?.length > 0 && (
              <>
                <AiFillHeart size={18} />
                <span className="text-xs">{post.likes?.length}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>9</span>
            <span className="">Comentários</span>
          </div>
        </div>

        <div className="h-10 flex items-center gap-2">
          {/* curtir  */}
          <button
            className="w-full h-8 font-bold flex items-center gap-2 justify-center hover:bg-colorSecondary   rounded-lg"
            onClick={() => {
              like(id);
            }}
          >
            {post.likes?.some((iten) => iten.userId === user?.id) ? (
              <>
                <AiFillHeart size={20} className="text-button" />
                <span
                  className={`${
                    post.likes?.some((iten) => iten.postId === id) &&
                    "text-button"
                  }`}
                >
                  Curtir
                </span>
              </>
            ) : (
              <>
                <AiOutlineHeart size={20} />
                <span
                  className={`${
                    post.likes?.some((iten) => iten.userId === id) && "text-button"
                  }`}
                >
                  Curtir
                </span>
              </>
            )}
          </button>

          <div className="w-full h-8 font-bold flex items-center gap-2 justify-center hover:bg-colorSecondary   rounded-lg">
            <BiMessageSquareDetail size={20} />
            Comentar
          </div>
        </div>
      </div>
    </div>
  );
}
