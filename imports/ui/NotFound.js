import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <p>Haahahaha! Dead end!!!</p> 
                    <Link className="button button--link" to='/'>home</Link>
                </div>
            </div>
    );
};
