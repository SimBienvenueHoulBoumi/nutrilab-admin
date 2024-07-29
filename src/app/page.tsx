"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormValues } from "@/types/formValues.types";
import CustomInput from "@/components/myInput.components";
import VerifyUser from "../services/auth.service";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormValues> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);

    try {
      const isValid = await VerifyUser(data.email, data.password);
      if (isValid) {
        setTimeout(() => {
            toast("login successfull", {
                type: "success",
            });
        }, 2000);

        window.location.href = "/dashboard/home";
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast("An error occurred during login.", {
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9bee75] to-[#DFAF2C] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white m-auto w-full shadow-lg rounded-md p-6 sm:p-8 lg:p-10">
          <h2 className="my-3 text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Access admin dashboard
          </h2>
          <form
            className="space-y-4"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomInput
              label="email"
              type="email"
              register={register}
              required={true}
            />
            <CustomInput
              label="password"
              type="password"
              register={register}
              required={true}
            />
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
