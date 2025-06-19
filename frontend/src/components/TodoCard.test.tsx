import { render, screen } from '@testing-library/react';
import { describe, expect, it,vi } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import TodoCard from './TodoCard';
import type { Todo } from '../services/todos';

const mockTodo: Todo = {
  id: 1,
  name: 'Test Todo',
  dueDate: '2025-07-01',
  isCompleted: false,
  isArchived: false,
  categories: [{ id: 1, categoryName: 'coding', isArchived: false }],
};


describe('TodoCard', () => {
    it('Should renders todo name and due date', () => {
        render(
            <table>
                <tbody>
                    <TodoCard 
                        todo= {mockTodo}
                        onDelete={vi.fn()}
                        onComplete={vi.fn()}
                        onUpdate={vi.fn()}
                    />
                </tbody>
            </table>
        );
        expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
        expect(screen.getByText(/2025-07-01/i)).toBeInTheDocument();
    });

    it('renders categories', () => {
    render(
      <table>
        <tbody>
          <TodoCard
            todo={mockTodo}
            onDelete={vi.fn()}
            onUpdate={vi.fn()}
            onComplete={vi.fn()}
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
          <TodoCard
            todo={mockTodo}
            onDelete={onDelete}
            onUpdate={vi.fn()}
            onComplete={vi.fn()}
          />
        </tbody>
      </table>
    );
    const btn = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(btn);
    expect(onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

   it('disables Complete button if todo is completed', () => {
    const completedTodo = { ...mockTodo, isCompleted: true };
    render(
      <table>
        <tbody>
          <TodoCard
            todo={completedTodo}
            onDelete={vi.fn()}
            onUpdate={vi.fn()}
            onComplete={vi.fn()}
          />
        </tbody>
      </table>
    );
    const btn = screen.getByRole('button', { name: /complete/i });
    expect(btn).toBeDisabled();
  });
  
})