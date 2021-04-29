import React from 'react';

export const BUTTON_TYPES = {
    default: 'default',
    primary: 'primary',
    positive: 'positive',
    negative: 'negative',
    warning: 'warning',
}

const Button = ({ type, label, onClick, children }) => {
    const buttonType = Object.keys(BUTTON_TYPES).some(t => t === type) ? type : BUTTON_TYPES.default;
    return (<button className={`btn btn-${buttonType}`} onClick={onClick}>{label || children}</button>)
};

export default Button;