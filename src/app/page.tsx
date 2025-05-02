'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { TaskInput } from '@/components/task-input';
import { TaskList } from '@/components/task-list';
import type { Task } from '@/types/task';

const LOCAL_STORAGE_KEY = 'taskflow-tasks';

const Home: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load tasks from local storage on component mount (client-side only)
  useEffect(() => {
    setIsClient(true); // Indicate that we are now on the client
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        // Ensure loaded tasks have the new fields, provide defaults if missing
        const loadedTasks: Task[] = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: task.createdAt || new Date(0).toISOString(), // Default to epoch if missing
          completedAt: task.completedAt, // Keep undefined if missing
        }));
        setTasks(loadedTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks from local storage:", error);
      // localStorage.removeItem(LOCAL_STORAGE_KEY); // Optionally clear invalid storage
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes (client-side only)
  useEffect(() => {
    if (isClient) { // Only run on the client after initial render
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to local storage:", error);
      }
    }
  }, [tasks, isClient]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(), // Simple unique ID generator
      text,
      completed: false,
      createdAt: new Date().toISOString(), // Set creation timestamp
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              // Set completedAt if marking complete, otherwise remove it
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          ToDo list {/* Updated Heading */}
        </h1>
        <TaskInput onAddTask={handleAddTask} />
      </header>
      <main>
        {isClient ? ( // Only render TaskList on the client to avoid hydration issues
           <TaskList
             tasks={tasks}
             onToggleComplete={handleToggleComplete}
             onDeleteTask={handleDeleteTask}
           />
        ) : (
          // Optional: Show a loading state or placeholder while waiting for client-side render
          <p className="text-center text-muted-foreground">Loading tasks...</p>
        )}
      </main>
    </div>
  );
};

export default Home;
