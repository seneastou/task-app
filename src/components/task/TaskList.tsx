'use client';
import React, { useState } from 'react';
import TaskCard from './TaskCard'; // Composant pour chaque carte de tâche
import Modal from '../../components/Modal'; // Composant Modal pour afficher les détails

interface TaskListProps {
  tasks: { id: number; title: string; description: string }[];
  onDeleteTask: (id: number) => void;
}

export default function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ouvrir le modal pour confirmer la suppression de la tâche
  const handleOpenModal = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null); // Réinitialiser la tâche sélectionnée
  };

  // Confirmer et supprimer la tâche
  const handleConfirmDelete = () => {
    if (selectedTask) {
      onDeleteTask(selectedTask.id);
      handleCloseModal(); // Fermer le modal après la suppression
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onOpenModal={() => handleOpenModal(task)} // Ouvre le modal pour la suppression
          />
        ))
      ) : (
        <p className="text-gray-600 col-span-full text-center">Aucune tâche pour le moment.</p>
      )}

      {/* Modal pour confirmer la suppression */}
      {selectedTask && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="text-lg text-gray-800 font-semibold mb-4">
            <h2 className="text-center">Voulez-vous vraiment supprimer la tâche ?</h2>
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                onClick={handleCloseModal}
              >
                Annuler
              </button>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                onClick={handleConfirmDelete} // Confirmation de la suppression
              >
                Confirmer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
