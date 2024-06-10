"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from 'react-spinners';
import CustomInput from '@/components/myInput.components';
import { createArticle } from '@/services/articles.service';

interface IArticleFormValues {
  name: string;
  description: string;
  area: string;
}

const continents = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Australia",
  "South America"
];

function CreateArticle() {
  const { register, handleSubmit } = useForm<IArticleFormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IArticleFormValues> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await createArticle(data);
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/dashboard/articles';
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-auto sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div className="bg-white m-auto w-4/12 shadow-lg rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create a New Article
          </h2>
          <form className="space-y-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <CustomInput<IArticleFormValues>
              label="name"
              type='text'
              register={register}
              required={true}
            />
            <CustomInput<IArticleFormValues>
              label="description"
              type='text'
              register={register}
              required={true}
            />
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <select
                id="area"
                {...register("area", { required: true })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 sm:text-sm"
              >
                {continents.map((continent, index) => (
                  <option key={index} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : 'Create Article'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
