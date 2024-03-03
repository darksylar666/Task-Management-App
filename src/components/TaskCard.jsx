"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

function TaskCard({ tasks }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-black text-center">
          Tasks
        </h1>
        <Link href="/new">➕</Link>
        <div className="overflow-auto max-h-[500px]">
          <table className="table-auto border-collapse w-full">
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 border-b border-gray-300 text-left text-gray-700">
                    <div>
                      <h2 className="text-lg font-bold text-black">
                        {task.title}
                      </h2>
                      <p className="text-sm text-black">{task.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300 text-right">
                    <button
                      onClick={() => {
                        fetch(`/api/tasks/${task.id}`, {
                          method: "DELETE",
                        })
                          .then(() => {
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.error("Error:", error);
                          });
                      }}
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => {
                        router.push("/tasks/edit/" + task.id);
                      }}
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
