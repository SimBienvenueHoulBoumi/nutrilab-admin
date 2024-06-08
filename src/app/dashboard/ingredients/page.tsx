"use client"

import React, { useState } from 'react';
import Link from 'next/link';

interface Ingredient {
  id: number;
  name: string;
  picture: string;
  labelDosage: string;
  dosage: string;
  libeleDosage: string
}

const ingredients: Ingredient[] = [
  { id: 1, name: 'Ingredient 1', picture: 'url1', labelDosage: 'Label 1', dosage: '10' , libeleDosage: 'kg'},
  { id: 2, name: 'Ingredient 2', picture: 'url2', labelDosage: 'Label 2', dosage: '20' ,libeleDosage: 'kg'},
  { id: 3, name: 'Ingredient 3', picture: 'url3', labelDosage: 'Label 3', dosage: '30' ,libeleDosage: 'kg' },
  { id: 4, name: 'Ingredient 4', picture: 'url4', labelDosage: 'Label 4', dosage: '41',libeleDosage: 'kg' },

];

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors de la recherche
  };

  const filteredIngredients = ingredients.filter(
    ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.labelDosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.libeleDosage.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="space-x-2">
          <Link href="/dashboard/ingredients/create"
            className='btn btn-outline'>create</Link>
          <div className='btn btn-danger'>
            delete
          </div>
        </div>
      </div>
      <table className="table card bg-[#FFFF] rounded-xl">
        {/* en-tête */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Nom</th>
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
                  <input type="checkbox" className="checkbox" />
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
              <td>
                <button className="btn btn-ghost btn-xs">détails</button>
              </td>
              <th>
                <button className="btn btn-error btn-xs">delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* pied de page */}
        <tfoot>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Libellé de dosage</th>
            <th>Dosage</th>
            <th></th>
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
