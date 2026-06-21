import type { FastifyReply, FastifyRequest } from "fastify";
import { FollowService } from "../services/follow.service.js";

export class FollowController {
  private followService: FollowService;

  constructor() {
    this.followService = new FollowService();
  }

  follow = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sub: followerId } = request.user as { sub: string };
      const { id: followingId } = request.params as { id: string };

      const follow = await this.followService.follow(
        followerId,
        followingId
      );

      return reply.status(201).send(follow);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };

  unfollow = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sub: followerId } = request.user as { sub: string };
      const { id: followingId } = request.params as { id: string };

      await this.followService.unfollow(followerId, followingId);

      return reply.status(204).send();
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };

  getFollowers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sub: userId } = request.user as { sub: string };
      const followers = await this.followService.getFollowers(userId);
      return reply.status(200).send(followers);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };

  getFollowing = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sub: userId } = request.user as { sub: string };
      const following = await this.followService.getFollowing(userId);
      return reply.status(200).send(following);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };
}

