import clsx from "clsx";
import { FormEvent, InputHTMLAttributes, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  inputUse?: "text" | "password" | "search";
  value?: string | undefined;
  id?: string;
  className?: string;
  children?: ReactNode;
}

type TViewUsuario = {
  id: number;
  nome: string;
  email: string;
  data_criacao: Date;
};

export function InputSearch(props: InputProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState<TViewUsuario[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (search === "") {
      setUsuarios([]);
    } else {
      const response = await api.get(`/usuario/buscar?busca=${search}`);

      setUsuarios(response.data);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("h-10  max-w-[680px] w-full group/item relative z-1")}
    >
      <input
        className="h-full bg-[#3a3b3c] rounded-full w-full block pr-7  pl-9  text-gray-300 focus:shadow-0 hover:bg-[#4e4f50] focus:outline-0  placeholder:text-gray-600"
        placeholder={props.placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <span className="focus:text-blue-200 flex items-center absolute rounded-[24px] bottom-0 left-0 h-full pl-3 text-blue-800">
        {props.icon}
      </span>

      <span className="flex items-center absolute rounded-full bottom-0 left-0 h-full  ml-1">
        <button
          type="submit"
          className="flex items-center focus:text-blue-200 rounded-full p-2 text-blue-800 cursor-pointer hover:bg-gray-800"
        >
          {props.icon}
        </button>
      </span>
    </form>
  );
}
