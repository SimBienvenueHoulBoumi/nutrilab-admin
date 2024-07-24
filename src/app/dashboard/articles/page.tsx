"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article } from '@/interface/article.interface';
import { getArticles, deleteArticleById } from '@/services/articles.service';
import MyLoader from '@/components/loader.components';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEMS_PER_PAGE = 5;

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticles, setSelectedArticles] = useState<string[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getArticles();
                setArticles(fetchedArticles);
            } catch (error) {
                console.error('Failed to fetch articles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDeleteArticle = async (id: string) => {
        try {
            await deleteArticleById(id);
            setArticles(articles.filter(article => article.id !== id));
            toast.success('Article deleted successfully!');
        } catch (error) {
            console.error(`Error deleting article with id ${id}:`, error);
        }
    };

    const handleDeleteSelectedArticles = async () => {
        try {
            await Promise.all(selectedArticles.map(id => deleteArticleById(id)));
            setArticles(articles.filter(article => !selectedArticles.includes(article.id)));
            setSelectedArticles([]);
            toast.success('Selected articles deleted successfully!');
        } catch (error) {
            console.error('Failed to delete selected articles:', error);
        }
    };

    const handleSelectArticle = (id: string) => {
        setSelectedArticles(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(articleId => articleId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedArticles.length === currentItems.length) {
            setSelectedArticles([]);
        } else {
            setSelectedArticles(currentItems.map(article => article.id));
        }
    };

    const filteredArticles = articles.filter(
        article =>
            article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.userId.toLowerCase().includes(searchTerm.toLowerCase())
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

    if (loading) {
        return <MyLoader />;
    }

    return (
        <div className="overflow-y-auto max-w-full">
            <ToastContainer />
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
                    <Link href="/dashboard/articles/create" className='btn btn-outline'>
                        create
                    </Link>
                    <button
                        onClick={handleDeleteSelectedArticles}
                        className='btn btn-danger'
                        disabled={selectedArticles.length === 0}
                    >
                        delete
                    </button>
                </div>
            </div>

            <table className="table card bg-[#FFFF] rounded-xl">
                {/* En-tête */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedArticles.length === currentItems.length && currentItems.length > 0}
                                />
                            </label>
                        </th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Zone</th>
                        <th>Utilisateur</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(article => (
                        <tr key={article.id}>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selectedArticles.includes(article.id)}
                                        onChange={() => handleSelectArticle(article.id)}
                                    />
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
                            <td>{article.userId}</td>
                            <th>
                                <button className="btn btn-error btn-xs" onClick={() => handleDeleteArticle(article.id)}>delete</button>
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
