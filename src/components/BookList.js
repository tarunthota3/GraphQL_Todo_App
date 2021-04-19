import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries'; 
import BookDetails from './BookDetails';

function BookList() {
    const [selected, setSelected] = useState(null);
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const getBooksDetails = () => {
        return data.books.map(({ id, name }) => (
            <li key={id} onClick={(e) => setSelected(id)}>{name}</li>
          ));
    }
    return (
        <div>
            <ul id='book-list'>
                {getBooksDetails()}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}

export default BookList;