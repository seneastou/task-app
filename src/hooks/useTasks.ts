'use client';
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
 
}

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les tâches côté client (GET)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api');
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des tâches');
        }
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        setError('Impossible de récupérer les données');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Ajouter une tâche (POST)
  const addTask = async (task: Omit<Task, 'id' | 'status'>) => {
    try {
      const res = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) {
        throw new Error('Erreur lors de l’ajout de la tâche');
      }
      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      setError('Erreur lors de l’ajout de la tâche');
      console.error(error);
    }
  };

  // Supprimer une tâche (DELETE)
  const deleteTask = async (id: number) => {
    try {
      const res = await fetch('http://localhost:3000/api', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError('Erreur lors de la suppression de la tâche');
      console.error(error);
    }
  };

  // Mettre à jour une tâche (PUT)
  const updateTask = async (updatedTask: Task) => {
    try {
      const res = await fetch('http://localhost:3000/api', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }
      const data = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === data.id ? data : task))
      );
    } catch (error) {
      setError('Erreur lors de la mise à jour de la tâche');
      console.error(error);
    }
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    loading,
    error,
  };
}
