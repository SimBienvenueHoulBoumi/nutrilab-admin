"use client"

import React, { useState } from 'react';
import Link from 'next/link';

interface Article {
    id: number;
    name: string;
    description: string;
    area: string;
    username: string;
}

const articles: Article[] = [
    {
        id: 1,
        name: 'Article 1',
        description: 'Description 1',
        area: 'Area 1',
        username: 'User 1'
    },
    {
        id: 2,
        name: 'Article 2',
        description: 'Description 2',
        area: 'Area 2',
        username: 'User 2'
    },
    {
        id: 3,
        name: 'Article 3',
        description: 'Description 3',
        area: 'Area 3',
        username: 'User 3'
    },
    {
        id: 4,
        name: 'Article 4',
        description: 'Description 4',
        area: 'Area 4',
        username: 'User 4'
    },
    {
        id: 5,
        name: 'Article 5',
        description: 'Description 5',
        area: 'Area 5',
        username: 'User 5'
    },
    {
        id: 6,
        name: 'Article 6',
        description: 'Description 6',
        area: 'Area 6',
        username: 'User 6'
    },
    {
        id: 7,
        name: 'Article 7',
        description: 'Description 7',
        area: 'Area 7',
        username: 'User 7'
    },
    {
        id: 8,
        name: 'Article 8',
        description: 'Description 8',
        area: 'Area 8',
        username: 'User 8'
    },
    {
        id: 9,
        name: 'Article 9',
        description: 'Description 9',
        area: 'Area 9',
        username: 'User 9'
    },
    {
        id: 10,
        name: 'Article 10',
        description: 'Description 10',
        area: 'Area 10',
        username: 'User 10'
    },
    {
        id: 11,
        name: 'Article 11',
        description: 'Description 11',
        area: 'Area 11',
        username: 'User 11'
    },
    {
        id: 12,
        name: 'Article 12',
        description: 'Description 12',
        area: 'Area 12',
        username: 'User 12'
    },
    {
        id: 13,
        name: 'Article 13',
        description: 'Description 13',
        area: 'Area 13',
        username: 'User 13'
    },
    {
        id: 14,
        name: 'Article 14',
        description: 'Description 14',
        area: 'Area 14',
        username: 'User 14'
    },
    {
        id: 15,
        name: 'Article 15',
        description: 'Description 15',
        area: 'Area 15',
        username: 'User 15'
    },
    {
        id: 16,
        name: 'Article 16',
        description: 'Description 16',
        area: 'Area 16',
        username: 'User 16'
    },
    {
        id: 17,
        name: 'Article 17',
        description: 'Description 17',
        area: 'Area 17',
        username: 'User 17'
    },
    {
        id: 18,
        name: 'Article 18',
        description: 'Description 18',
        area: 'Area 18',
        username: 'User 18'
    },
    {
        id: 19,
        name: 'Article 19',
        description: 'Description 19',
        area: 'Area 19',
        username: 'User 19'
    },
    {
        id: 20,
        name: 'Article 20',
        description: 'Description 20',
        area: 'Area 20',
        username: 'User 20'
    },
    {
        id: 21,
        name: 'Article 21',
        description: 'Description 21',
        area: 'Area 21',
        username: 'User 21'
    },
    {
        id: 22,
        name: 'Article 22',
        description: 'Description 22',
        area: 'Area 22',
        username: 'User 22'
    },
    {
        id: 23,
        name: 'Article 23',
        description: 'Description 23',
        area: 'Area 23',
        username: 'User 23'
    },
    {
        id: 24,
        name: 'Article 24',
        description: 'Description 24',
        area: 'Area 24',
        username: 'User 24'
    },
    {
        id: 25,
        name: 'Article 25',
        description: 'Description 25',
        area: 'Area 25',
        username: 'User 25'
    },
    {
        id: 26,
        name: 'Article 26',
        description: 'Description 26',
        area: 'Area 26',
        username: 'User 26'
    },
    {
        id: 27,
        name: 'Article 27',
        description: 'Description 27',
        area: 'Area 27',
        username: 'User 27'
    },
    {
        id: 28,
        name: 'Article 28',
        description: 'Description 28',
        area: 'Area 28',
        username: 'User 28'
    },
    {
        id: 29,
        name: 'Article 29',
        description: 'Description 29',
        area: 'Area 29',
        username: 'User 29'
    },
    {
        id: 30,
        name: 'Article 30',
        description: 'Description 30',
        area: 'Area 30',
        username: 'User 30'
    }
];


const ITEMS_PER_PAGE = 5; // Number of items per page


export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Réinitialiser à la première page lors de la recherche
    };

    const filteredArticles = articles.filter(
        article =>
            article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.username.toLowerCase().includes(searchTerm.toLowerCase()) // Ajout de la recherche par "username"
    );

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)) {
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
                    <Link href="/dashboard/articles/create"
                        className='btn btn-outline'>create</Link>
                    <div className='btn btn-danger'>
                        delete
                    </div>
                </div>
            </div>

            <table className="table card bg-[#FFFF] rounded-xl">
                {/* En-tête */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Zone</th>
                        <th>Utilisateur</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(article => (
                        <tr key={article.id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="font-bold">{article.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {article.description}
                            </td>
                            <td>{article.area}</td>
                            <td>{article.username}</td> {/* Afficher le champ "username" */}
                            <th>
                                <button className="btn btn-ghost btn-xs">Détails</button>
                            </th>
                            <th>
                                <button className="btn btn-error btn-xs">delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
                {/* Pied de page */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Zone</th>
                        <th>Utilisateur</th>
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
                    disabled={currentPage === Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)}
                    className="join-item btn btn-outline"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}
