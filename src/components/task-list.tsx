'use client';

import type { FC } from 'react';
import type { Task } from '@/types/task';
import { TaskItem } from './task-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
}) => {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingTasks.length > 0 ? (
            <ul className="space-y-3">
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No pending tasks. Add one above!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDeleteTask={onDeleteTask}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
