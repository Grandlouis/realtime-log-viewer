import React, { Fragment } from 'react';

const Nav = ({ activeItem, sections }) => {
    return (
        <nav className="nav-group">
            {sections?.map((section, i) => (
                <Fragment key={i}>
                    <h5 className="nav-group-title">{section.title}</h5>
                    {section.items.map(item => item.name == activeItem ? (
                        <a key={item.name} className="nav-group-item active">
                            {item.activeIcon}
                            {item.name}
                        </a>) :
                        (<span key={item.name} className="nav-group-item" onClick={() => {
                            typeof item.onActivate === 'function' && item.onActivate()
                        }}>
                            {item.inactiveIcon}
                            {item.name}
                        </span>)
                    )}
                </Fragment>
            ))}
        </nav>
    );
};

export default Nav;