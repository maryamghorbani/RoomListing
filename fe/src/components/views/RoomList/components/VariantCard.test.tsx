import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VariantCard } from './VariantCard.tsx';
import {
  mockVariantWithDiscount,
  mockVariantNoDiscount,
} from '@/__tests__/mocks/roomData.ts';

describe('VariantCard', () => {
  it('renders variant name and price correctly', () => {
    render(<VariantCard variant={mockVariantWithDiscount} />);

    expect(screen.getByText('Standard Rate')).toBeInTheDocument();
    expect(screen.getByText('RM800')).toBeInTheDocument();
  });

  it('displays discount information when present', () => {
    render(<VariantCard variant={mockVariantWithDiscount} />);

    expect(screen.getByText('RM1,000')).toBeInTheDocument();
    expect(screen.getByText('RM1,000')).toHaveClass('line-through');
    expect(screen.getByText('20% off')).toBeInTheDocument();
  });

  it('does not display discount when missing', () => {
    render(<VariantCard variant={mockVariantNoDiscount} />);

    expect(screen.queryByText(/% off/)).not.toBeInTheDocument();
  });

  it('renders price info', () => {
    render(<VariantCard variant={mockVariantWithDiscount} />);

    expect(screen.getByText('Price for 1 night')).toBeInTheDocument();
  });

  it('renders cancellation policy button', () => {
    render(<VariantCard variant={mockVariantWithDiscount} />);

    expect(
      screen.getByRole('button', { name: /cancellation policy/i }),
    ).toBeInTheDocument();
  });

  it('renders capacity and bedType when provided', () => {
    render(
      <VariantCard
        variant={mockVariantWithDiscount}
        capacity="Up to 2 adults"
        bedType="King bed"
      />,
    );

    expect(screen.getByText('Up to 2 adults')).toBeInTheDocument();
    expect(screen.getByText(/King bed/)).toBeInTheDocument();
  });

  it('does not render capacity and bedType when not provided', () => {
    render(<VariantCard variant={mockVariantNoDiscount} />);

    expect(screen.queryByText(/adults/)).not.toBeInTheDocument();
    expect(screen.queryByText(/bed/)).not.toBeInTheDocument();
  });

  it('renders Select button', () => {
    render(<VariantCard variant={mockVariantWithDiscount} />);

    expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
  });
});
