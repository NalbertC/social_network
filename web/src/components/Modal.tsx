import { ReactNode } from "react";
import { BsX } from "react-icons/bs";

interface ModalProps {
  trigger: ReactNode;
  children: ReactNode;
  active: boolean;
  setActive: any
}

export function Modal({ trigger, children, active , setActive}: ModalProps) {



  return (
    <>
      <div onClick={() => setActive(true)}>{trigger}</div>

      {active && (
        <div className="fixed bg-background/60 top-0 bottom-0 left-0 right-0 h-screen w-screen items-center flex justify-center z-0">
          <div className="absolute flex-1 h-screen w-screen" onClick={() => setActive(false)} />

          <div className="bg-card z-50 relative rounded-2xl">
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setActive(false) }
            >
              <BsX className="text-textPrincipal" size={24} />
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
}
