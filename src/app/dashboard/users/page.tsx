"use client"

import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  article: number;
  ingredients: number;
}

const users: User[] = [
  { id: 1, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 1, ingredients: 1001 },
  { id: 2, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 2, ingredients: 1002 },
  { id: 3, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 3, ingredients: 1003 },
  { id: 4, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 4, ingredients: 1004 },
  { id: 5, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 5, ingredients: 1005 },
  { id: 6, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 6, ingredients: 1006 },
  { id: 7, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 7, ingredients: 1007 },
  { id: 8, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 8, ingredients: 1008 },
  { id: 9, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 9, ingredients: 1009 },
  { id: 10, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 10, ingredients: 1010 },
  { id: 11, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 11, ingredients: 1011 },
  { id: 12, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 12, ingredients: 1012 },
  { id: 13, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 13, ingredients: 1013 },
  { id: 14, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 14, ingredients: 1014 },
  { id: 15, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 15, ingredients: 1015 },
  { id: 16, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 16, ingredients: 1016 },
  { id: 17, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 17, ingredients: 1017 },
  { id: 18, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 18, ingredients: 1018 },
  { id: 19, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 19, ingredients: 1019 },
  { id: 20, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 20, ingredients: 1020 },
  { id: 21, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 21, ingredients: 1021 },
  { id: 22, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 22, ingredients: 1022 },
  { id: 23, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 23, ingredients: 1023 },
  { id: 24, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 24, ingredients: 1024 },
  { id: 25, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 25, ingredients: 1025 },
  { id: 26, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 26, ingredients: 1026 },
  { id: 27, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 27, ingredients: 1027 },
  { id: 28, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 28, ingredients: 1028 },
  { id: 29, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 29, ingredients: 1029 },
  { id: 30, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 30, ingredients: 1030 },
  { id: 31, username: 'Marjy Ferencz', firstname: 'Marjy', lastname: 'Ferencz', article: 31, ingredients: 1031 },
  { id: 32, username: 'Yancy Tear', firstname: 'Yancy', lastname: 'Tear', article: 32, ingredients: 1032 },
  { id: 33, username: 'Hart Hagerty', firstname: 'Hart', lastname: 'Hagerty', article: 33, ingredients: 1033 },
  { id: 34, username: 'Brice Swyre', firstname: 'Brice', lastname: 'Swyre', article: 34, ingredients: 1034 },
];

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
      </div>
      <table className="table card bg-[#FFFF] rounded-xl">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Username</th>
            <th>Article saved</th>
            <th>Ingredients saved</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(user => (
            <tr key={user.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-bold">{user.username}</div>
                  </div>
                </div>
              </td>
              <td>
                {user.article}
              </td>
              <td>{user.ingredients}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
              <th>
                <button className="btn btn-error btn-xs">delete</button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Article saved</th>
            <th>Ingredients saved</th>
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
          disabled={currentPage === Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)}
          className="join-item btn btn-outline"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
