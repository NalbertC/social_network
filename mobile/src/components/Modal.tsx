import { ReactNode } from "react";
import { Modal, ModalProps, View } from "react-native";

interface ModalView extends ModalProps {
  children: ReactNode;
}

export function ModalView({
  children,

  ...rest
}: ModalView) {
  return (
    <Modal {...rest}>
      <View
        className="flex-1 items-center justify-center "
        style={{ backgroundColor: "rgba(10, 10, 10, 0.4)" }}
      >
        <View className="bg-card p-4 w-[320px] rounded-2xl">{children}</View>
      </View>
    </Modal>
  );
}
