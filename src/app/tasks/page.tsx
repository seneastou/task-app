'use client';
import React from 'react';
import TaskForm from '../../components/task/TaskForm'; 
import TaskList from '../../components/task/TaskList';
import useTasks from '../../hooks/useTasks'; // Import du hook personnalisé

export default function TasksPage() {
  // Utilisation du hook useTasks pour gérer l'état des tâches
  const { tasks, addTask, deleteTask } = useTasks(); // Utilisation des méthodes du hook

  return (
    <div 
      className="bg-[url('/image/paysage.jpg')] bg-cover bg-center bg-no-repeat h-screen"
    >
      <div className="bg-black bg-opacity-50 min-h-screen p-8">
      <h1 className="text-3xl text-center text-white mt-1">
      Bienvenue sur mon Application de Gestion des Tâches
    </h1>
        {/* Utilisation des méthodes du hook pour ajouter et supprimer des tâches */}
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onDeleteTask={deleteTask} />
      </div>
    </div>
  );
}
