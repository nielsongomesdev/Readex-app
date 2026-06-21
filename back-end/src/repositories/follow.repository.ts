import { prisma } from "../lib/prisma.js";

export class FollowRepository {
  async exists(followerId: string, followingId: string): Promise<boolean> {
    const follow = await prisma.follow.findUnique({

      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      select: { createdAt: true },
    });

    return !!follow;
  }

  async create(followerId: string, followingId: string) {
    return prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async delete(followerId: string, followingId: string): Promise<void> {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async getFollowers(userId: string) {
    try {
      return await prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
            }
          }
        }
      });
    } catch (err) {
      return [];
    }
  }

  async getFollowing(userId: string) {
    try {
      return await prisma.follow.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              email: true,
              createdAt: true,
            }
          }
        }
      });
    } catch (err) {
      return [];
    }
  }
}

