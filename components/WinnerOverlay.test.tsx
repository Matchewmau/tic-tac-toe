import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WinnerOverlay } from './WinnerOverlay';

describe('WinnerOverlay', () => {
  it('renders nothing without a result', () => {
    const { container } = render(<WinnerOverlay result={null} onPlayAgain={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the draw banner', () => {
    render(<WinnerOverlay result={{ type: 'draw' }} onPlayAgain={vi.fn()} />);
    expect(screen.getByText('Draw')).toBeInTheDocument();
  });

  it('announces a match win and offers play again', () => {
    const onPlayAgain = vi.fn();
    render(
      <WinnerOverlay
        result={{ type: 'win', player: 'shadow', line: [0, 1, 2] }}
        matchWinner="shadow"
        onPlayAgain={onPlayAgain}
      />,
    );
    expect(screen.getByText('Shadow claims the Triforce!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play again' }));
    expect(onPlayAgain).toHaveBeenCalledOnce();
  });
});
