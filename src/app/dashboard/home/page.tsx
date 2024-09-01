"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Ingredient } from "@/interface/ingredients.interface";
import { getArticles, countArticles } from "@/services/articles.service";
import {
  getIngredients,
  deleteIngredient,
} from "@/services/ingredients.service";
import { Article } from "@/interface/article.interface";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { usersRegister } from "@/services/users.service";

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [articlesCount, setArticlesCount] = useState<number | null>(null);
  const [usersCount, setUsersCount] = useState<number | null>(null); // Added state for users count
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedArticleId) {
      const fetchIngredients = async () => {
        try {
          const fetchedIngredients = await getIngredients(selectedArticleId);
          setIngredients(fetchedIngredients);
        } catch (error) {
          console.error("Failed to fetch ingredients:", error);
        }
      };

      fetchIngredients();
    }
  }, [selectedArticleId]);

  useEffect(() => {
    const fetchArticlesCount = async () => {
      try {
        const count = await countArticles();
        setArticlesCount(count);
      } catch (error) {
        console.error("Failed to fetch articles count:", error);
      }
    };

    fetchArticlesCount();
  }, []);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const count = await usersRegister(); // Fetch users count
        setUsersCount(count);
      } catch (error) {
        console.error("Failed to fetch users count:", error);
      }
    };

    fetchUsersCount();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleArticleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArticleId(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectIngredient = (id: string) => {
    setSelectedIngredients((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAllIngredients = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setSelectedIngredients(
        new Set(currentItems.map((ingredient) => ingredient.id))
      );
    } else {
      setSelectedIngredients(new Set());
    }
  };

  const handleDeleteSelectedIngredients = async () => {
    try {
      await Promise.all(
        Array.from(selectedIngredients).map((id) =>
          deleteIngredient(id, selectedArticleId)
        )
      );
      setIngredients((prevIngredients) =>
        prevIngredients.filter(
          (ingredient) => !selectedIngredients.has(ingredient.id)
        )
      );
      setSelectedIngredients(new Set());
      toast.success("Selected ingredients deleted successfully");
    } catch (error: any) {
      console.error(`Failed to delete selected ingredients: ${error.message}`);
      toast.error(`Failed to delete selected ingredients: ${error.message}`);
    }
  };

  const handleDeleteIngredient = async (id: string) => {
    try {
      await deleteIngredient(id, selectedArticleId);
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== id)
      );
      setSelectedIngredients((prevSelected) => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(id);
        return newSelected;
      });
      toast.success("Ingredient deleted successfully");
    } catch (error: any) {
      console.error(`Failed to delete ingredient: ${error.message}`);
      toast.error(`Failed to delete ingredient: ${error.message}`);
    }
  };

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.labelDosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ingredient.dosage &&
        typeof ingredient.dosage === "string" &&
        ingredient.dosage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredIngredients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-2 py-auto sm:px-3 lg:px-4">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your dashboard. Here you can manage your data and view
          analytics.
        </p>
      </div>

      <div className="flex space-x-3 w-full">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Articles saved</h2>
          <p className="text-3xl">
            {articlesCount !== null ? articlesCount : "Loading..."}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Registered Users</h2>
          <p className="text-3xl">
            {usersCount !== null ? usersCount : "Loading..."}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Articles</h2>
          <Link className="btn btn-secondary" href="/dashboard/articles/create">
            Create
          </Link>
        </div>
        <div className="flex flex-row space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered w-full"
          />
          <select
            onChange={handleArticleChange}
            value={selectedArticleId}
            className="select bg-white w-56 input-bordered"
          >
            <option value="">Select Article</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>
                {article.name}
              </option>
            ))}
          </select>
        </div>

        {selectedArticleId && (
          <div>
            <div className="overflow-y-auto">
              <table className="min-w-full text-left bg-white">
                <thead>
                  <tr>
                    <th className="py-2">
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={handleSelectAllIngredients}
                        checked={
                          selectedIngredients.size === currentItems.length &&
                          currentItems.length > 0
                        }
                      />
                    </th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Picture</th>
                    <th className="py-2">Label Dosage</th>
                    <th className="py-2">Dosage</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((ingredient) => (
                    <tr key={ingredient.id} className="border-t">
                      <td className="py-2">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedIngredients.has(ingredient.id)}
                          onChange={() => handleSelectIngredient(ingredient.id)}
                        />
                      </td>
                      <td className="py-2">{ingredient.name}</td>
                      <td className="py-2">
                        <Image
                          width={100}
                          height={100}
                          src="/viande.jpg"
                          alt={ingredient.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </td>
                      <td className="py-2">{ingredient.labelDosage}</td>
                      <td className="py-2">{ingredient.dosage}</td>
                      <td className="py-2">
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => handleDeleteIngredient(ingredient.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between p-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="btn btn-outline"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                  Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)
                }
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
            <button
              className="btn btn-danger mt-4"
              onClick={handleDeleteSelectedIngredients}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
