import React from 'react';

function SortingAndSearch({ searchTerm, setSearchTerm, sortBy, handleSortBy }) {
    return (
        <React.Fragment>
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks by name..."
                className={`w-full mb-2 p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 dark:bg-indigo-900 bg-gray-100`}
            />
            <div className="flex items-center justify-between mb-4">
                <span>Sort by:</span>
                <select
                    value={sortBy}
                    onChange={(e) => handleSortBy(e.target.value)}
                    className={`p-2 border border-gray-300 rounded transition-all ease-in-out duration-500 dark:bg-indigo-900 dark:text-white bg-gray-100 text-black`}
                >
                    <option value="">None</option>
                    <option value="hardToLow">High to Low</option>
                    <option value="lowToHard">Low to High</option>
                    <option value="newestFirst">Newest First</option>
                    <option value="oldestFirst">Oldest First</option>
                </select>
            </div>
        </React.Fragment>
    );
}

export default SortingAndSearch;
