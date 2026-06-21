import { FollowRepository } from "../repositories/follow.repository.js";

export class FollowService {
  private followRepository: FollowRepository;

  constructor() {
    this.followRepository = new FollowRepository();
  }

  async follow(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new Error("Você não pode seguir a si mesmo.");
    }

    const alreadyExists = await this.followRepository.exists(
      followerId,
      followingId
    );

    if (alreadyExists) {
      throw new Error("Você já segue este usuário.");
    }

    return this.followRepository.create(followerId, followingId);
  }

  async unfollow(followerId: string, followingId: string) {
    const alreadyExists = await this.followRepository.exists(followerId, followingId);

    if (!alreadyExists) {
      throw new Error("Você não segue este usuário.");
    }

    await this.followRepository.delete(followerId, followingId);
  }

  async getFollowers(userId: string) {
    return this.followRepository.getFollowers(userId);
  }

  async getFollowing(userId: string) {
    return this.followRepository.getFollowing(userId);
  }
}

