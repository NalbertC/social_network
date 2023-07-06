import React, { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  icon?: ReactNode;
}

export function Button({ children, icon, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-10 bg-button w-full rounded-lg items-center justify-center flex-row "
      activeOpacity={0.7}
      {...rest}
    >
      {icon}
      <Text className="text-textPrincipal text-lg font-[helveticaBold] pl-1">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
