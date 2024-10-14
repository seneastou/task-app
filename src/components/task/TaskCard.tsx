import React from 'react';
import Link from 'next/link'; // Import du composant Link de Next.js

interface TaskCardProps {
  task: { id: number; title: string; description: string };
  onOpenModal: () => void; // Prop pour ouvrir le modal
}

export default function TaskCard({ task, onOpenModal }: TaskCardProps) {
  return (
    <div className="bg-white text-center shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6">
      <Link href={`/tasks/${task.id}`} passHref>
        <div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">{task.title}</h2>
          <p className="text-gray-600 mb-4">{task.description}</p>
        </div>
      </Link>
      <div className="flex justify-center items-center">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Empêche la redirection lors du clic sur "Supprimer"
            onOpenModal(); // Ouvre le modal pour confirmer la suppression
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}





