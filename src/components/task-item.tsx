'use client';

import type { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Task } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem: FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
}) => {
  return (
    <li
      className={cn(
        "flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent transition-colors",
        task.completed && "bg-muted hover:bg-muted/80" // Slightly different background for completed tasks
      )}
      aria-live="polite" // Announce changes
    >
      <div className="flex items-center gap-3 flex-grow mr-2">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-label={task.completed ? `Mark ${task.text} as incomplete` : `Mark ${task.text} as complete`}
        />
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            'text-sm cursor-pointer flex-grow break-words', // Ensure long text wraps
            task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
          )}
        >
          {task.text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete task ${task.text}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
};
