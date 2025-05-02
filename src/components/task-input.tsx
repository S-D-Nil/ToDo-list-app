'use client';

import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export const TaskInput: FC<TaskInputProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddTask(trimmedValue);
      setInputValue(''); // Clear input after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow"
        aria-label="New task input"
      />
      <Button type="submit" aria-label="Add task">
        <Plus className="h-4 w-4 mr-2" /> Add Task
      </Button>
    </form>
  );
};
