import { View, Text, SafeAreaView, ScrollView, Image, Alert } from "react-native";
import React, { useState, useTransition } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signIn } from "@/lib/appwrite";


const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormSchema = z.infer<typeof formSchema>


const SignIn = () => {
  const { control, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema)
  });

  const [isSubmitting, setSubmitting] = useState(false);



  const submit = async (data: FormSchema) => {
    setSubmitting(true);

    try {
      await signIn(data.email, data.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain" />
          <KeyboardAwareScrollView>

            <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>
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
              title="Sign in"
              onPress={handleSubmit(submit)}
              containerClassName="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex flex-row justify-center items-center pt-5">
              <Text className="text-gray-100 text-lg font-pregular">Don't have an account?</Text>
              <Link href="/sign-up" className="text-secondary text-lg font-psemibold ml-1">Sign up</Link>
            </View>
          </KeyboardAwareScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
