import React from 'react';

const WindowContainer = ({header, children, footer}) => {
    return (<div className="window">
        {header}
        <div className="window-content">
            {children}
        </div>
        {footer}
    </div>);
};

export default WindowContainer;