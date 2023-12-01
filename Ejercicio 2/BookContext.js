// 1:

import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);

    const refetchBooks = () => {
        fetch('https://api.org/books')
            .then((response) => response.json())
            .then((data) => {
                // Set the state directly with the new books
                setBooks(data.response);
            });
    };

    const refetchUsers = () => {
        fetch('https://api.org/users')
            .then((response) => response.json())
            .then((data) => {
                // Set the state directly with the new users
                setUsers(data.response);
            });
    };

    useEffect(() => {
        refetchBooks();
        refetchUsers();
    }, []);

    return (
        <DataContext.Provider value={{ books, users, refetchBooks, refetchUsers }}>
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useDataContext };
