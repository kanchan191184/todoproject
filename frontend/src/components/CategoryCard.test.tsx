import { render, screen } from '@testing-library/react';
import { describe, expect, it,vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import CategoryCard from './CategoryCard';
import type { Category } from '../services/todos';

const mockCategory: Category= {
    id: 1,
    categoryName: 'coding',
    isArchived: false
};

describe('TodoCard', () => {
    it('Should renders category name', () => {
        render(
            <table>
                <tbody>
                    <CategoryCard 
                        category= {mockCategory}
                        onDelete={vi.fn()}
                        onUpdate={vi.fn()}
                    />
                </tbody>
            </table>
        );
        expect(screen.getByText(/coding/i)).toBeInTheDocument();
    });

    
    it('calls onDelete when Delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(
      <table>
        <tbody>
          <CategoryCard
            category={mockCategory}
            onDelete={onDelete}
            onUpdate={vi.fn()}
          />
        </tbody>
      </table>
    );
    const btn = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(btn);
    expect(onDelete).toHaveBeenCalledWith(mockCategory.id);
  });

})