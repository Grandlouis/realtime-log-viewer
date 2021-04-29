import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, BUTTON_TYPES } from '../components';

describe("Button", () => {
    it('should render', () => {
        render(<Button />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it('should render Default', () => {
        render(<Button />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`btn-${BUTTON_TYPES.default}`);
    });

    it('should render Negative', () => {
        render(<Button type={BUTTON_TYPES.negative}/>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`btn-${BUTTON_TYPES.negative}`);
    });
    
    it('should render Positive', () => {
        render(<Button type={BUTTON_TYPES.positive} />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`btn-${BUTTON_TYPES.positive}`);
    });
    
    it('should render Primary', () => {
        render(<Button type={BUTTON_TYPES.primary} />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`btn-${BUTTON_TYPES.primary}`);
    });
    
    it('should render Warning', () => {
        render(<Button type={BUTTON_TYPES.warning} />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass(`btn-${BUTTON_TYPES.warning}`);
    });
});