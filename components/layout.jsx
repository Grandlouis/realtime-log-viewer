import React from 'react';

export const SIDEBAR_SIZE = {
    normal: 'sm',
    small: 'mini'
}

export const SidebarLayout = ({ sidebarSize, sidebar, children }) => {
    const sidebarSizeValue = Object.keys(SIDEBAR_SIZE).some(i => i === sidebarSize) ? sidebarSize : SIDEBAR_SIZE.normal;

    return (<div className="window">
        <div className="window-content">
            <div className="pane-group">
                <div className={`pane-${sidebarSizeValue} sidebar`}>{sidebar}</div>
                <div className="pane">{children}</div>
            </div>
        </div>
    </div>);
}

export default SidebarLayout;