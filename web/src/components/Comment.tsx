import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

interface CommentProps {}

export function Comment({}: CommentProps) {
  const [comment, setComment] = useState("");

  return (
    <div className="flex gap-4 my-4 relative">
      <div className="bg-slate-500 min-h-[40px] min-w-[40px] rounded-full" />
      <input
        type="text"
        placeholder="Escreva um comentário"
        className="h-10 w-full rounded-full bg-colorSecondary focus:outline-0 text-sm px-4"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      {comment !== "" && (
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 mr-4 cursor-pointer"
          onClick={() => {
            if (comment !== "") {
              console.log(comment);
            }
          }}
        >
          <BsFillSendFill size={22}  className="rotate-0"/>
        </span>
      )}
    </div>
  );
}
