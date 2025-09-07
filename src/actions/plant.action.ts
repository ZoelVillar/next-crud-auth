"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";
import { getUserId } from "./user.action";
import { Prisma } from "@/generated/prisma";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    return { success: true, userPlants };
  } catch (error) {
    console.error("Error fetching plants:", error);
    return { success: false, error: "Failed to fetch plants" };
  }
}

export async function getPlantById(id: string) {
  return await prisma.plants.findUnique({
    where: { id },
  });
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
  console.log("Creating plant with data:", data);

  try {
    const currentUserId = await getUserId();
    if (!currentUserId) {
      throw new Error("User not authenticated");
    }
    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.error("Error creating plant:", error);
    throw new Error("Failed to create plant");
  }
}

export async function editPlant(id: string, data: Prisma.PlantsUpdateInput) {
  try {
    const currentUserId = await getUserId();
    const updatedPlant = await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
  } catch (error) {
    console.error("Error editing plant:", error);
    throw new Error("Failed to edit plant");
  }
}

export async function deletePlant(id: string) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) {
      throw new Error("User not authenticated");
    }
    const deletedPlant = await prisma.plants.delete({
      where: { id },
    });
    revalidatePath("/plants");
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw new Error("Failed to delete plant");
  }
}
