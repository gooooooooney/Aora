import { View, Text, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createUser } from "@/lib/appwrite";
import { Controller, useForm } from 'react-hook-form';


const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  username: z.string().min(3, 'full name must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormSchema = z.infer<typeof formSchema>

const SignUp = () => {
  const { control, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
    resolver: zodResolver(formSchema)
  });


  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = (data: FormSchema) => {
    // createUser(form.email, form.password, form.username)
    Alert.alert('Sign up', JSON.stringify(data))
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>

        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain" />
          <KeyboardAwareScrollView>

            <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Sign up to Aora</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormField
                  title="Username"
                  value={value}
                  otherStyles="mt-10"
                  error={error}
                  handleChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormField
                  title="Email"
                  value={value}
                  error={error}
                  otherStyles="mt-7"
                  handleChangeText={onChange}
                  keyboardType="email-address"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormField
                  title="Password"
                  value={value}
                  error={error}
                  otherStyles="mt-7"
                  handleChangeText={onChange}
                />
              )}
            />
            <CustomButton
              title="Sign up"
              onPress={handleSubmit(submit)}
              containerClassName="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex flex-row justify-center items-center pt-5">
              <Text className="text-gray-100 text-lg font-pregular">
                Already have an account?
              </Text>
              <Link href="/sign-in" className="text-secondary text-lg font-psemibold ml-1">Sign in</Link>
            </View>
          </KeyboardAwareScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
