'use client';
import React, { useState } from 'react';
import Input from '../Input'; // Composant Input
import Button from '../Button'; // Composant Button

interface TaskFormProps {
  onAddTask: (task: { title: string; description: string }) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAddTask({ title, description });
      setTitle('');
      setDescription(''); // Réinitialiser les champs
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-xl mx-auto mt-20">
      <div className=" w-full p-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la tâche"
        />
      </div>
      <div className=" w-full p-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500">
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ajouter
        </Button>
      </div>
    </form>
  );
}
