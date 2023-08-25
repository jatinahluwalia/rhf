"use client";

import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form: React.FC = (props: React.HTMLAttributes<HTMLFormElement>) => {
  const labelStyle = "text-right text-white";
  const inputStyle =
    "border-gray-400 border-[0.5px] bg-zinc-900 text-white placeholder:text-gray-500 col-span-3 px-4 py-2 rounded-md";
  const errorStyle = "col-span-4 text-red-600 text-left";

  const schema = z.object({
    email: z.string().nonempty("Field is required").email("Invalid format"),
    username: z.string().nonempty("Field is required"),
    password: z.string().nonempty("Field is required"),
  })

  type formValues = {
    email: string;
    username: string;
    password: string;
  };

  const form = useForm<formValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched"
  });
  const { register, control, handleSubmit, formState, getValues, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (values: formValues) => {
    const asyncValues: formValues = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(values);
        if (!values) reject("No values found");
      }, 2000);
    });
    console.log(asyncValues);
  };

  const onError = (errors: FieldErrors<formValues>) => {
    console.log(errors);
  };

  // const [hydrated, setHydrated] = useState(false);
  // useEffect(() => {
  //   setHydrated(true);
  // }, []);
  // if (!hydrated) {
  //   // Returns null on first render, so the client and server match
  //   return null;
  // }

  return (
    <form
      className="flex flex-col"
      {...props}
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <div
        className={`grid grid-cols-4 place-content-center items-center gap-5`}
      >
        <label htmlFor="email" className={labelStyle}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email..."
          className={inputStyle}
          {...register("email")}
        />
        {errors.email && <p className={errorStyle}> {errors.email.message} </p>}

        <label htmlFor="username" className={labelStyle}>
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          className={inputStyle}
          {...register("username")}
        />
        {errors.username && (
          <p className={errorStyle}> {errors.username.message} </p>
        )}

        <label htmlFor="password" className={labelStyle}>
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          className={inputStyle}
          {...register("password")}
        />
        {errors.password && (
          <p className={errorStyle}> {errors.password.message} </p>
        )}
      </div>
      <button
        disabled={!isDirty || !isValid || isSubmitting}
        className="ml-auto mt-5 rounded-md bg-white px-5 py-2 text-black disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        SUBMIT
      </button>
      <DevTool control={control} />
    </form>
  );
};

export default Form;
