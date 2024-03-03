"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isEditing = Boolean(params.id);

  useEffect(() => {
    if (isEditing) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, [params.id, isEditing]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (isEditing) {
      res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
    }
    const data = await res.json();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-500 rounded-lg p-8 w-96">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl text-gray mb-4 text-center">
            {isEditing ? "Editar tarea" : "Creación de tareas"}
          </h1>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="flex justify-start font-bold text-sm"
            >
              Título:
            </label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-black"
              id="title"
              type="text"
              name="name"
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="flex justify-start font-bold text-sm"
            >
              Descripción:
            </label>
            <textarea
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-black"
              rows="3"
              id="description"
              placeholder="Describa su tarea ..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className={
                isEditing
                  ? "bg-green-500 text-white px-4 py-2 rounded-md"
                  : "bg-blue-500 text-white px-4 py-2 rounded-md"
              }
            >
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPage;
