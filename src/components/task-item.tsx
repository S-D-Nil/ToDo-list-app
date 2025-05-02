'use client';

import type { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Task } from '@/types/task';
import { cn } from '@/lib/utils';
import { format } from 'date-fns'; // Import date-fns for formatting

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
  // Safely parse dates, handle potential invalid date strings
  const createdAtDate = task.createdAt ? new Date(task.createdAt) : null;
  const completedAtDate = task.completedAt ? new Date(task.completedAt) : null;

  const isValidDate = (d: Date | null): d is Date => d instanceof Date && !isNaN(d.getTime());

  return (
    <li
      className={cn(
        "flex items-start justify-between p-3 rounded-md border bg-card hover:bg-accent transition-colors", // Use items-start for vertical alignment
        task.completed && "bg-muted hover:bg-muted/80"
      )}
      aria-live="polite"
    >
      <div className="flex items-start gap-3 flex-grow mr-2 pt-1"> {/* Align checkbox with top of text */}
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-label={task.completed ? `Mark ${task.text} as incomplete` : `Mark ${task.text} as complete`}
          className="mt-1" // Adjust checkbox position slightly if needed
        />
        <div className="flex-grow"> {/* Wrapper for label and timestamps */}
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              'text-sm cursor-pointer flex-grow break-words block', // Use block to allow text wrapping
              task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
            )}
          >
            {task.text}
          </label>
          {/* Timestamp Display */}
          <div className="text-xs text-muted-foreground mt-1 space-y-0.5 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
            {isValidDate(createdAtDate) && (
              <span>Added: {format(createdAtDate, 'h:mma, d MMM, yy')}</span>
            )}
            {task.completed && isValidDate(completedAtDate) && (
              <span>Done: {format(completedAtDate, 'h:mma, d MMM, yy')}</span>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0" // Prevent button from shrinking
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete task ${task.text}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
};
