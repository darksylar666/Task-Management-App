import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  return await prisma.task.findMany();
}

async function HomePage() {
  const tasks = await loadTasks();
  return (
    <div>
      <TaskCard tasks={tasks} />
    </div>
  );
}

export default HomePage;
