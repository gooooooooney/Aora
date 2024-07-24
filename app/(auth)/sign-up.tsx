import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    createUser(form.email, form.password, form.username)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain" />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            otherStyles="mt-10"
            handleChangeText={e => setForm({ ...form, username: e })}
          />
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
          <CustomButton
            title="Sign up"
            onPress={submit}
            containerClassName="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex flex-row justify-center items-center pt-5">
            <Text className="text-gray-100 text-lg font-pregular">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-secondary text-lg font-psemibold ml-1">Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
