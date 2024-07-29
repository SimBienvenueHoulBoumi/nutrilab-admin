"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import CustomInput from "@/components/myInput.components";
import { createIngredient } from "@/services/ingredients.service";
import { getArticles } from "@/services/articles.service";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IIngredientFormValues {
  name: string;
  picture: string;
  labelDosage: string;
  dosage: string;
}

interface Article {
  id: string;
  name: string;
}

function CreateIngredient() {
  const { register, handleSubmit } = useForm<IIngredientFormValues>();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticles();
        setArticles(articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const onSubmit: SubmitHandler<IIngredientFormValues> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    setLoading(true);

    try {
      await createIngredient(data, selectedArticleId);
      setLoading(false);
      toast("Ingredient created successfully!", {
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "/dashboard/ingredients";
      }, 2000);
    } catch (error) {
      console.error("Error creating ingredient:", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-auto sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="w-full space-y-8">
        <div className="bg-white m-auto w-4/12 shadow-lg rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create a New Ingredient
          </h2>
          <form
            className="space-y-3"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="article"
                className="block text-sm font-medium text-gray-700"
              >
                Select Article
              </label>
              <select
                id="article"
                value={selectedArticleId}
                onChange={(e) => setSelectedArticleId(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 sm:text-sm"
                required
              >
                <option value="" disabled>
                  Select an article
                </option>
                {articles.map((article) => (
                  <option key={article.id} value={article.id}>
                    {article.name}
                  </option>
                ))}
              </select>
            </div>
            <CustomInput<IIngredientFormValues>
              label="name"
              type="text"
              register={register}
              required={true}
            />
            <CustomInput<IIngredientFormValues>
              label="picture"
              type="text"
              register={register}
              required={true}
            />
            <CustomInput<IIngredientFormValues>
              label="labelDosage"
              type="text"
              register={register}
              required={true}
            />
            <CustomInput<IIngredientFormValues>
              label="dosage"
              type="number"
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
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Create Ingredient"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateIngredient;
