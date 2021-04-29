import React from 'react';

const Header = ({ title, children }) => {
    return (
        <header className="toolbar toolbar-header">
            {title && <h1 className="title">{title}</h1>}
            {!title && children}
        </header>
    );
}

export default Header;