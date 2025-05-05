'use client'; // Add 'use client' directive

import type { Task } from '@/types/task'; // Assuming Task type is defined here

// Run this code only in the browser environment
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {

    // --- Navigation Logic ---
    // Set default section to home
    if (!window.location.hash) {
      window.location.hash = '#home';
    }

    // Function to switch sections
    function switchSection(sectionId: string) {
      // Hide all sections
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
      });

      // Show selected section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active-section');
      } else {
        // Fallback to home if section not found
        window.location.hash = '#home';
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.add('active-section');
        }
      }

      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });

      const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      } else {
         // Fallback to home link if specific link not found
         const homeLink = document.querySelector(`.nav-link[data-section="home"]`);
         if (homeLink) {
            homeLink.classList.add('active');
         }
      }
    }

    // Handle nav clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        if (sectionId) {
          window.location.hash = sectionId;
          switchSection(sectionId);
        }
      });

      // Prevent text selection on double click
      link.addEventListener('mousedown', function(e) {
        if (e.detail > 1) e.preventDefault();
      });
    });

    // Handle initial load and hash changes
    function handleHashChange() {
      const sectionId = window.location.hash.substring(1);
      const validSections = ['home', 'done', 'deleted', 'contact'];

      if (validSections.includes(sectionId)) {
        switchSection(sectionId);
      } else {
        window.location.hash = 'home';
        switchSection('home');
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial call

    // Ensure nav is properly scrollable
    function setupNavScroll() {
      const nav = document.querySelector('.nav') as HTMLElement | null;
      const navContent = document.querySelector('.nav > div') as HTMLElement | null;

      if (nav && navContent) {
          nav.style.height = '100vh';
          navContent.style.minHeight = '100%';

          // Ensure scrolling starts from the top after setup
          setTimeout(() => {
            if (nav) nav.scrollTop = 0;
          }, 100);
      }
    }

    window.addEventListener('resize', setupNavScroll);
    setupNavScroll();


    // --- ToDo List Logic ---
    const taskInput = document.querySelector('.brutalist-input') as HTMLInputElement | null;
    const tasksListHome = document.querySelector('#home .tasks-list') as HTMLOListElement | null;
    const tasksListDone = document.querySelector('#done .tasks-list') as HTMLOListElement | null;
    const tasksListDeleted = document.querySelector('#deleted .tasks-list') as HTMLOListElement | null;
    const LOCAL_STORAGE_KEY = 'taskflow-tasks-brutalist'; // Use a different key if needed

    let tasks: Task[] = [];

    // Load tasks from local storage
    function loadTasks() {
      try {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTasks) {
          tasks = JSON.parse(storedTasks).map((task: any) => ({
            ...task,
            createdAt: task.createdAt || new Date(0).toISOString(),
            completedAt: task.completedAt,
            deletedAt: task.deletedAt, // Add deletedAt field
          }));
        } else {
            tasks = []; // Ensure tasks is an empty array if nothing is stored
        }
      } catch (error) {
        console.error("Failed to load tasks from local storage:", error);
        tasks = []; // Reset tasks on error
      }
      renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to local storage:", error);
      }
    }

    // Render tasks in the respective sections
    function renderTasks() {
        if (!tasksListHome || !tasksListDone || !tasksListDeleted) return;

        tasksListHome.innerHTML = '';
        tasksListDone.innerHTML = '';
        tasksListDeleted.innerHTML = '';

        const pendingTasks = tasks.filter(task => !task.completed && !task.deletedAt);
        const completedTasks = tasks.filter(task => task.completed && !task.deletedAt);
        const deletedTasks = tasks.filter(task => task.deletedAt);

        pendingTasks.forEach(task => tasksListHome.appendChild(createTaskElement(task)));
        completedTasks.forEach(task => tasksListDone.appendChild(createTaskElement(task)));
        deletedTasks.forEach(task => tasksListDeleted.appendChild(createTaskElement(task)));

        // Add placeholders if lists are empty
        addPlaceholderIfNeeded(tasksListHome, "No pending tasks.");
        addPlaceholderIfNeeded(tasksListDone, "No completed tasks.");
        addPlaceholderIfNeeded(tasksListDeleted, "No deleted tasks.");
    }

    function addPlaceholderIfNeeded(listElement: HTMLElement, placeholderText: string) {
        if (listElement.children.length === 0) {
            const placeholder = document.createElement('p');
            placeholder.textContent = placeholderText;
            placeholder.className = 'text-muted-foreground text-center py-4'; // Style as needed
            listElement.appendChild(placeholder);
        }
    }


    // Create HTML element for a task
    function createTaskElement(task: Task): HTMLLIElement {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.taskId = task.id;

        const card = document.createElement('div');
        card.className = 'card';

        const taskText = document.createElement('p');
        taskText.textContent = task.text;

        const timestampText = document.createElement('p');
        let timestampContent = '';
        const createdAtDate = new Date(task.createdAt);
        timestampContent += `Added: ${formatDate(createdAtDate)}`;

        if (task.completed && task.completedAt) {
            const completedAtDate = new Date(task.completedAt);
            timestampContent += `<br>Done: ${formatDate(completedAtDate)}`;
        } else if (task.deletedAt) {
            const deletedAtDate = new Date(task.deletedAt);
            timestampContent = `Deleted:<br>${formatDate(deletedAtDate)}`;
        }
        timestampText.innerHTML = timestampContent;

        card.appendChild(taskText);

        // Add buttons based on task state
        if (!task.deletedAt) {
            if (!task.completed) {
                const doneButton = document.createElement('button');
                doneButton.className = 'done-mark';
                doneButton.innerHTML = '<ion-icon name="checkmark-done-circle-outline"></ion-icon>';
                doneButton.onclick = () => toggleComplete(task.id);
                card.appendChild(doneButton);
            }

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-mark';
            deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';
            if (task.deletedAt) {
                 // Optional: Add permanent delete functionality here if needed
                 // deleteButton.onclick = () => permanentlyDeleteTask(task.id);
            } else {
                 deleteButton.onclick = () => deleteTask(task.id);
            }

            card.appendChild(deleteButton);
        } else {
             // Optionally show a restore button or permanent delete for deleted tasks
             const permanentDeleteButton = document.createElement('button');
             permanentDeleteButton.className = 'delete-mark'; // Reuse style or create new
             permanentDeleteButton.innerHTML = '<ion-icon name="trash-bin-outline"></ion-icon>'; // Different icon maybe
             permanentDeleteButton.title = 'Delete Permanently';
             permanentDeleteButton.onclick = () => permanentlyDeleteTask(task.id);
             card.appendChild(permanentDeleteButton);
        }


        card.appendChild(timestampText); // Add timestamp last
        li.appendChild(card);
        return li;
    }


     // Format date helper
     function formatDate(date: Date): string {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        // Example format: 12:00 AM, 14 Feb, 25
        const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };

        const timeString = date.toLocaleTimeString('en-US', timeOptions);
        const dateString = date.toLocaleDateString('en-GB', dateOptions); // en-GB for d MMM format

        return `${timeString}, ${dateString}`;
    }


    // Add a new task
    function addTask(text: string) {
        const newTask: Task = {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    }

    // Toggle task completion
    function toggleComplete(id: string) {
        tasks = tasks.map(task =>
            task.id === id
            ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : undefined }
            : task
        );
        saveTasks();
        renderTasks();
    }

    // Mark task as deleted (soft delete)
    function deleteTask(id: string) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, deletedAt: new Date().toISOString(), completed: false, completedAt: undefined } : task // Mark as deleted
        );
        saveTasks();
        renderTasks();
    }

    // Permanently delete a task (usually from the deleted view)
    function permanentlyDeleteTask(id: string) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks(); // Re-render the deleted tasks list
    }


    // Event listener for the input field (e.g., on Enter key press)
    if (taskInput) {
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const text = taskInput.value.trim();
                if (text) {
                    addTask(text);
                    taskInput.value = ''; // Clear input
                }
            }
        });
    }


    // Initial load of tasks
    loadTasks();

  });
}
