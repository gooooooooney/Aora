import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} className="w-[115px h-[35px]" resizeMode="contain" />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            otherStyles="mt-7"
            handleChangeText={e => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            otherStyles="mt-7"
            handleChangeText={e => setForm({ ...form, password: e })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
