'use client';

import React, { useEffect, useState } from 'react';
import { getUsers, deleteUserById } from "@/services/users.service";
import User from "@/interface/users.interface";
import MyLoader from '@/components/loader.components';

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDelete = async (id: string) => {
    try {
      await deleteUserById(id);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
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
      </div>
      <table className="table card bg-[#FFFF] rounded-xl">
        <thead>
          <tr>
            <th>Email</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(user => (
            <tr key={user.id}>
              <td>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-bold">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <th>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-error btn-xs"
                >
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
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
