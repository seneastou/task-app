import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Chemin vers le fichier tasks.json
const tasksFilePath = path.join(process.cwd(), 'src', 'data', 'tasks.json');

// Fonction pour lire les tâches depuis le fichier JSON
async function readTasksFromFile() {
  const data = await fs.readFile(tasksFilePath, 'utf-8');
  return JSON.parse(data);
}

// Fonction pour écrire les tâches dans le fichier JSON
async function writeTasksToFile(tasks: any) {
  await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

// GET - Récupérer toutes les tâches
export async function GET() {
  try {
    const tasks = await readTasksFromFile();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la récupération des tâches' }, { status: 500 });
  }
}

// GET - Récupérer une tâche par son id

export async function GETTASKBYID(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const tasks = await readTasksFromFile();
    const task = tasks.find((task: any) => task.id === parseInt(id || '0'));
    if (!task) {
      return NextResponse.json({ message: 'Tâche non trouvée' }, { status: 404 });
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la récupération de la tâche' }, { status: 500 });
  }
}

// POST - Ajouter une nouvelle tâche
export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json({ message: 'Le titre et la description sont requis' }, { status: 400 });
    }

    const tasks = await readTasksFromFile();
    const newTask = { id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, title, description};
    tasks.push(newTask);

    await writeTasksToFile(tasks);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de l’ajout de la tâche' }, { status: 500 });
  }
}

// DELETE - Supprimer une tâche
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    let tasks = await readTasksFromFile();
    tasks = tasks.filter((task: any) => task.id !== id);

    await writeTasksToFile(tasks);

    return NextResponse.json({ message: 'Tâche supprimée avec succès' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la suppression de la tâche' }, { status: 500 });
  }
}

// PUT - Mettre à jour une tâche
export async function PUT(req: Request) {
  try {
    const updatedTask = await req.json();
    let tasks = await readTasksFromFile();

    tasks = tasks.map((task: any) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task));

    await writeTasksToFile(tasks);

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur lors de la mise à jour de la tâche' }, { status: 500 });
  }
}

