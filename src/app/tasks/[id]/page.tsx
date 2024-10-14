'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Input from '../../../components/Input';
import useTasks from '../../../hooks/useTasks'; 

export default function EditTaskPage() {
  const params = useParams();
  const id = params.id as string; 

  const { tasks, updateTask, loading, error } = useTasks(); // Utilisation du hook pour récupérer et mettre à jour les tâches
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  // Charger les détails de la tâche spécifique à partir des tâches récupérées par useTasks
  useEffect(() => {
    const taskDetail = tasks.find((task: any) => task.id === parseInt(id));
    if (taskDetail) {
      setTitle(taskDetail.title);
      setDescription(taskDetail.description);
      setStatus(taskDetail.status || 'In Progress');
    }
  }, [id, tasks]);

  // Fonction pour mettre à jour la tâche via l'API
  const handleUpdateTask = () => {
    if (title.trim() && description.trim()) {
      updateTask({ id: parseInt(id), title, description, status });
    }
    alert('Tâche mise à jour avec succès');
  };

  if (loading) {
    return <div>Chargement de la tâche...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div 
      className="bg-[url('/image/arbre.jpg')] bg-cover bg-center bg-no-repeat h-screen"
    >
      <div className="container mx-auto p-6">
        <Link href='/tasks' className="text-white hover:underline">Retour à la liste des tâches</Link>
        <h1 className="text-2xl text-center font-bold text-white mb-4">Détails de la tâche</h1>
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Titre :</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Modifier le titre de la tâche"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description :</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Modifier la description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Statut :</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
            >
              <option value="In Progress">En Cours</option>
              <option value="Completed">Terminé</option>
            </select>
          </div>
          <button
            onClick={handleUpdateTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors justify-center w-full"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
}
