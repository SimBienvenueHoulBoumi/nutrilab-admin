"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Ingredient {
  id: number;
  name: string;
  picture: string;
  labelDosage: string;
  dosage: string;
}

const ingredients: Ingredient[] = [
  { id: 1, name: 'Ingredient 1', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-B1bcLzh_NegAOlC0V-rA3xsm_rX3URbow&usqp=CAU', labelDosage: 'Label 1', dosage: '10mg' },
  { id: 2, name: 'Ingredient 2', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-B1bcLzh_NegAOlC0V-rA3xsm_rX3URbow&usqp=CAU', labelDosage: 'Label 1', dosage: '10mg' },
  { id: 3, name: 'Ingredient 3', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-B1bcLzh_NegAOlC0V-rA3xsm_rX3URbow&usqp=CAU', labelDosage: 'Label 1', dosage: '10mg' },
  { id: 4, name: 'Ingredient 4', picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb-B1bcLzh_NegAOlC0V-rA3xsm_rX3URbow&usqp=CAU', labelDosage: 'Label 1', dosage: '10mg' },
];

const ITEMS_PER_PAGE = 2; // Number of items per page

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredIngredients = ingredients.filter(
    ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.labelDosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.dosage.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard. Here you can manage your data and view analytics.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Ingredients</h2>
          <Link className="btn btn-secondary" href="/dashboard/ingredients/create">Create</Link>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full mb-4"
        />
        <div className="overflow-y-auto">
          <table className="min-w-full text-left bg-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Picture</th>
                <th className="py-2">Label Dosage</th>
                <th className="py-2">Dosage</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(ingredient => (
                <tr key={ingredient.id} className="border-t">
                  <td className="py-2">{ingredient.name}</td>
                  <td className="py-2">
                    <Image width={100} height={100} src={ingredient.picture} alt={ingredient.name} className="w-10 h-10 object-cover rounded-full" />
                  </td>
                  <td className="py-2">{ingredient.labelDosage}</td>
                  <td className="py-2">{ingredient.dosage}</td>
                  <td className="py-2">
                    <button className="btn btn-ghost btn-xs">Details</button>
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
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
