// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Image, View, Text, ImageSourcePropType } from 'react-native';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

type TabIconProps = {
  name: string;
  color: string;
  icon: ImageSourcePropType;
  focused: boolean;
}
export const TabIcon = ({
  name,
  color,
  icon,
  focused,
}: TabIconProps) => (
  <View className='items-center justify-center gap-2'>
    <Image
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className='w-6 h-6'
    />
    <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{
      color,
    }}>
      {name}
    </Text>
  </View>
)

