import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock the global fetch function
global.fetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the main heading', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText('Resume Hub')).toBeInTheDocument();
  });

  it('renders a list of resumes after fetching', async () => {
    const mockResumes = [
      {
        id: 1,
        title: 'Software Engineer',
        summary: 'Experienced developer',
        skills: [{ name: 'React' }, { name: 'Node.js' }],
      },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockResumes,
    });

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    expect(screen.getByText('Experienced developer')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });
});
