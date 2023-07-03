import * as Dialog from "@radix-ui/react-dialog";
import { BsXCircle } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { NewTodo } from "./NewTodo";

export function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        type="button"
        className=" text-gray-200   h-10 w-full flex justify-center items-center gap-3 hover:bg-gray-700 focus:shadow-0 focus:outline-0 transition-colors"
      >
        <MdPlaylistAdd size={24} />
        Nova Tarefa
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

        <Dialog.Content className="absolute rounded-3 px-6 pt-4 pb-6 bg-background  w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:shadow-0 focus:outline-0">
          <Dialog.Close className="text-gray-400 absolute right-4 top-4 hover:text-red-400 focus:shadow-0 focus:outline-0">
            <BsXCircle size={24} aria-label="Fechar" />
          </Dialog.Close>

          <Dialog.Title className="text-2xl font-semibold leading-tight text-blue-900 ">
            Criar tarefa
          </Dialog.Title>

          <NewTodo />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
