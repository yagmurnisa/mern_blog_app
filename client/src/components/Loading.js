import React from 'react';
import loading from'../loading-gif.gif';
export const Loading = () => {
    return (
        <img
        src={loading}
        style={{ width: '100px', margin: 'auto', marginTop:'3%', display: 'block' }}
        alt="Loading..."
        />
    );
}