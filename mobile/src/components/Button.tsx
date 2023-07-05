import React, { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-10 bg-button w-full rounded-lg items-center justify-center"
      activeOpacity={0.7}
      {...rest}
    >
      <Text className="text-textPrincipal text-lg font-[helveticaBold]">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
