import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries';

function AddBook() {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthurId] = useState("");
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const displayAuthors = () => {
        if (loading) return <option disabled>Loading Authors...</option>;
        if (error) return <option disabled>Error :{error}</option>;
        return data.authors.map(({id, name}) =>
            <option key={id} value={id}>{name}</option>
        );
    }

    const submitForm = e => {
        e.preventDefault();
        addBook({ variables: {
             name,
             genre,
             authorId 
            },
            refetchQueries: [
                {
                    query: getBooksQuery
                }
            ]
        });
    }
    return (
        <form id='add-book' onSubmit={submitForm}>
            <div className='field'>
                <label>Book Name:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type='text' value={genre} onChange={(e) => setGenre(e.target.value)}></input>
            </div>
            <div className='field'>
                <label>Author:</label>
                <select onChange={(e) => setAuthurId(e.target.value)}>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook;