import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json(task);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const taskUpdate = await prisma.task.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json(taskUpdate);
}

export async function DELETE(request, { params }) {
  try {
    const taskRemove = await prisma.task.delete({
      where: {
        id: parseInt(params.id),
      },
    });
  
    return NextResponse.json(taskRemove);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
