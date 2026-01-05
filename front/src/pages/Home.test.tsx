import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Home } from './Home';

describe('Home Component', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it('should render the component', () => {
    render(<Home />);
    
    expect(screen.getByText('Gerador de Ideias')).toBeInTheDocument();
    expect(screen.getByText('Descreva seu nicho e descrição para receber uma ideia de publicação')).toBeInTheDocument();
  });

  it('should render input fields for nicho and descricao', () => {
    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho');
    const descricaoInput = screen.getByLabelText('Descrição');
    
    expect(nichoInput).toBeInTheDocument();
    expect(descricaoInput).toBeInTheDocument();
  });

  it('should render the button to generate idea', () => {
    render(<Home />);
    
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    expect(button).toBeInTheDocument();
  });

  it('should disable button when inputs are empty', () => {
    render(<Home />);
    
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    expect(button).toBeDisabled();
  });

  it('should enable button when both inputs are filled', () => {
    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho') as HTMLInputElement;
    const descricaoInput = screen.getByLabelText('Descrição') as HTMLTextAreaElement;
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    
    fireEvent.change(nichoInput, { target: { value: 'fitness' } });
    fireEvent.change(descricaoInput, { target: { value: 'treinos rápidos' } });
    
    expect(button).not.toBeDisabled();
  });

  it('should update input values when user types', () => {
    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho') as HTMLInputElement;
    const descricaoInput = screen.getByLabelText('Descrição') as HTMLTextAreaElement;
    
    fireEvent.change(nichoInput, { target: { value: 'tecnologia' } });
    fireEvent.change(descricaoInput, { target: { value: 'dicas de React' } });
    
    expect(nichoInput.value).toBe('tecnologia');
    expect(descricaoInput.value).toBe('dicas de React');
  });

  it('should show loading state when generating idea', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
        data: { ideia: 'Ideia gerada com sucesso!' },
      }),
    });

    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho');
    const descricaoInput = screen.getByLabelText('Descrição');
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    
    fireEvent.change(nichoInput, { target: { value: 'fitness' } });
    fireEvent.change(descricaoInput, { target: { value: 'treinos' } });
    fireEvent.click(button);
    
    expect(screen.getByRole('button', { name: /Gerando/i })).toBeInTheDocument();
  });

  it('should display generated idea when API call succeeds', async () => {
    const mockIdeia = 'Estratégia: Reels curtos com hooks impactantes...';
    
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
        data: { ideia: mockIdeia },
      }),
    });

    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho');
    const descricaoInput = screen.getByLabelText('Descrição');
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    
    fireEvent.change(nichoInput, { target: { value: 'fitness' } });
    fireEvent.change(descricaoInput, { target: { value: 'treinos rápidos' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(mockIdeia)).toBeInTheDocument();
    });
  });

  it('should call fetch with correct payload', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
        data: { ideia: 'Ideia' },
      }),
    });

    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho');
    const descricaoInput = screen.getByLabelText('Descrição');
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    
    fireEvent.change(nichoInput, { target: { value: 'saúde' } });
    fireEvent.change(descricaoInput, { target: { value: 'bem-estar' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/v1/gerar-ideia'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nicho: 'saúde', descricao: 'bem-estar' }),
        }),
      );
    });
  });

  it('should display error message when API call fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.reject(new Error('API Error')),
    });

    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho');
    const descricaoInput = screen.getByLabelText('Descrição');
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    
    fireEvent.change(nichoInput, { target: { value: 'fitness' } });
    fireEvent.change(descricaoInput, { target: { value: 'treinos' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao gerar ideia. Tente novamente.')).toBeInTheDocument();
    });
  });

  it('should render footer with copyright', () => {
    render(<Home />);
    
    const footer = screen.getByText(/Insta Marketing IA — Todos os direitos reservados/i);
    expect(footer).toBeInTheDocument();
  });

  it('should have logo element', () => {
    render(<Home />);
    
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should clear inputs after successful generation', async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
        data: { ideia: 'Ideia gerada' },
      }),
    });

    render(<Home />);
    
    const nichoInput = screen.getByLabelText('Nicho') as HTMLInputElement;
    const descricaoInput = screen.getByLabelText('Descrição') as HTMLTextAreaElement;
    const button = screen.getByRole('button', { name: /Gerar Ideia/i });
    
    fireEvent.change(nichoInput, { target: { value: 'fitness' } });
    fireEvent.change(descricaoInput, { target: { value: 'treinos' } });
    
    expect(nichoInput.value).toBe('fitness');
    expect(descricaoInput.value).toBe('treinos');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(nichoInput.value).toBe('');
      expect(descricaoInput.value).toBe('');
    });
  });
});
