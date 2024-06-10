"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ingredient } from '@/interface/ingredients.interface';
import { getArticles } from '@/services/articles.service';
import { getIngredients, deleteIngredient } from '@/services/ingredients.service';
import { Article } from '@/interface/article.interface';

import MyLoader from '@/components/loader.components';

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedArticleId) {
      const fetchIngredients = async () => {
        try {
          setLoading(true);
          const fetchedIngredients = await getIngredients(selectedArticleId);
          setIngredients(fetchedIngredients);
        } catch (error) {
          console.error("Failed to fetch ingredients:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchIngredients();
    }
  }, [selectedArticleId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleArticleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArticleId(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectIngredient = (id: string) => {
    setSelectedIngredients(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAllIngredients = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIngredients(new Set(currentItems.map(ingredient => ingredient.id)));
    } else {
      setSelectedIngredients(new Set());
    }
  };

  const handleDeleteSelectedIngredients = async () => {
    try {
      setLoading(true);
      await Promise.all(Array.from(selectedIngredients).map(id => deleteIngredient(id, selectedArticleId)));
      setIngredients(prevIngredients => prevIngredients.filter(ingredient => !selectedIngredients.has(ingredient.id)));
      setSelectedIngredients(new Set());
    } catch (error: any) {
      throw new Error(`Failed to delete selected ingredients: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIngredient = async (id: string) => {
    try {
      setLoading(true);
      await deleteIngredient(id, selectedArticleId);
      setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
      setSelectedIngredients(prevSelected => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(id);
        return newSelected;
      });
    } catch (error: any) {
      throw new Error(`Failed to delete ingredient: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    (ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.labelDosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ingredient.dosage && typeof ingredient.dosage === 'string' && ingredient.dosage.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

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

  if (loading) return <MyLoader/>;

  return (
    <div className="overflow-y-auto max-w-full">
      <div className="flex flex-row space-x-2 my-2">
        <label className="input bg-white w-56 input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow w-10"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
        </label>
        <select onChange={handleArticleChange} value={selectedArticleId} className="select bg-white w-56 input-bordered">
          <option value="">Select Article</option>
          {articles.map(article => (
            <option key={article.id} value={article.id}>
              {article.name}
            </option>
          ))}
        </select>
        <div className="space-x-2">
          <Link href="/dashboard/ingredients/create" className='btn btn-outline'>Create</Link>
          <button className='btn btn-danger' onClick={handleDeleteSelectedIngredients}>Delete Selected</button>
        </div>
      </div>
      <table className="table card bg-[#FFFF] rounded-xl">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSelectAllIngredients}
                  checked={selectedIngredients.size === currentItems.length && currentItems.length > 0}
                />
              </label>
            </th>
            <th>Name</th>
            <th>Libellé de dosage</th>
            <th>Dosage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(ingredient => (
            <tr key={ingredient.id}>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedIngredients.has(ingredient.id)}
                    onChange={() => handleSelectIngredient(ingredient.id)}
                  />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-bold">{ingredient.name}</div>
                  </div>
                </div>
              </td>
              <td>{ingredient.labelDosage}</td>
              <td>{ingredient.dosage}</td>
              <th>
                <button className="btn btn-error btn-xs" onClick={() => handleDeleteIngredient(ingredient.id)}>Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Libellé de dosage</th>
            <th>Dosage</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-start space-x-2 p-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="join-item btn btn-outline"
        >
          Précédent
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)}
          className="join-item btn btn-outline"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
