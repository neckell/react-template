import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe('App component', () => {
  it('should be a message', async () => {
    render(<App />);
    const text = screen.getByText(/learn react/i);
    expect(text).toBeInTheDocument();
  })
});
