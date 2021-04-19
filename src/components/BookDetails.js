import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const displayBookDetails = () => {
        if(data === undefined)
            return <div>No Book selected...</div>;
        const { book } = data;
        if(book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this Author:</p>
                    <ul className='other-books'>
                        {book.author.books.map((item, key) =>
                            <li key={key}>{item.name}</li>
                        )}
                    </ul>
                </div>
            );
        }
        else{
            return <div>No Book selected...</div>
        }
    }
    return (
        <div id='book-details'>
            {displayBookDetails()}
        </div>
    );
}

export default BookDetails;