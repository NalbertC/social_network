import React, { useEffect, useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";

import { Button } from "../components/Button";
import { CardPost } from "../components/CardPost";
import { Dropzone } from "../components/Dropzone";
import { Heading } from "../components/Heading";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import { Text } from "../components/Text";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { api } from "../services/api";
import { Post } from "./Home";

interface ProfileProps {}

export function Profile({}: ProfileProps) {
  const { logout, user } = useAuth();
  const { userProfile } = useProfile();
  const [post, setPost] = useState<Post[]>([]);
  const [isLike, setIsLike] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/posts/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPost(data);
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    if (selectedFile === null || selectedFile === undefined) {
      e.preventDefault();
    } else {
      const data = new FormData();
      !!selectedFile && data.append("file", selectedFile);

      try {
        const response = await api.post(`/uploads/user`, data);
      } catch (error) {
        console.error(error);
      }

      console.log(data);
    }
  }

  return (
    <Page>
      <div className="w-full flex flex-row justify-center ">
        <div className="max-w-[1218px] w-full flex flex-col">
          {/* perfil  */}
          <header className="flex flex-row gap-6 w-full py-4 items-stretch h-48 bg-card px-4 ">
            <div className="rounded-full h-40 w-40 relative">
              <img
                src={userProfile?.image?.url}
                alt=""
                className="rounded-[inherit]"
              />

              <Modal
                active={modalActive}
                setActive={setModalActive}
                trigger={
                  <div className="bg-card h-10 w-10 rounded-full absolute bottom-0 right-0 mr-2 mb-2 border-cardHover border flex items-center justify-center cursor-pointer">
                    <FaCamera size={20} />
                  </div>
                }
              >
                <form
                  className="flex p-6 flex-col gap-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <Dropzone
                      fileSelected={selectedFile}
                      onFileUploaded={setSelectedFile}
                    />
                  </div>

                  <div className="flex items-center justify-end w-full flex-col gap-4">
                    {selectedFile ? (
                      <Button
                        type="submit"
                        className="flex flex-row items-center gap-2 w-full justify-center h-10 rounded-xl border-cardHover border-2"
                      >
                        <Text className="font-bold">
                          Atualizar imagem de perfil
                        </Text>
                      </Button>
                    ) : (
                      <div className="flex flex-row items-center gap-2 hover:bg-cardHover w-full justify-center h-10 rounded-xl border-cardHover border-2">
                        <Text className="font-bold">
                          Atualizar imagem de perfil
                        </Text>
                      </div>
                    )}

                    <div
                      className="flex flex-row items-center gap-2 hover:bg-cardHover w-full justify-center h-10 rounded-xl border-cardHover border-2"
                      onClick={() => {
                        setSelectedFile(undefined);
                      }}
                    >
                      Cancelar
                    </div>
                  </div>
                </form>
              </Modal>
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
