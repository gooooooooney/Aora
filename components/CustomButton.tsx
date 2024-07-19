import { View, Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";
import React from "react";

type CustomButtonProps = {
  title: string;
  isLoading?: boolean;
  containerClassName?: string;
  textClassName?: string;
} & TouchableOpacityProps;

const CustomButton = ({ title, onPress, isLoading, containerClassName, textClassName, className }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerClassName} ${isLoading ? "opacity-50" : ""
        }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textClassName}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
