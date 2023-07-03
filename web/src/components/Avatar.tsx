import * as Avatar from "@radix-ui/react-avatar";

interface AvatarProps {
  url?: string;
  iniciais: string;
}

export function AvatarDemo(props: AvatarProps) {
  function avatar(nome: string | undefined) {
    if (nome === undefined) {
      return "Erro";
    }

    const palavras = nome.split(" ");

    const iniciais: string[] = [];

    palavras.forEach((palavra, i) => {
      const primeiraLetra = palavra.charAt(0).toUpperCase();

      if (i === 0 || i === palavras.length - 1) {
        iniciais.push(primeiraLetra);
      }
    });

    return iniciais;
  }

  return (
    <div>
      <Avatar.Root className="flex justify-center items-center w-10 h-10 rounded-[100%]  border border-[#3a3b3c]">
        <Avatar.Image
          className="w-fll h-full rounded-[inherit] "
          src={props.url}
        />

        <Avatar.Fallback className="text-gray-600 AvatarFallback">
          {avatar(props.iniciais)}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
