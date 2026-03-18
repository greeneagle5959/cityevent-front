import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

function Hello({ name = 'World' }) {
    return <div>Hello, {name}!</div>;
}

describe('Hello component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<Hello />);
        expect(getByText('Hello, World!')).toBeInTheDocument();
    });
    
    it('displays the correct greeting', () => {
        const { getByText } = render(<Hello name="Alice" />);
        expect(getByText('Hello, Alice!')).toBeInTheDocument();
    });
});