
import UserModel from './UserModel';

class FriendshipService {
  public static async sendFriendRequest(senderId: string, receiverUsername: string): Promise<void> {
    const sender = await UserModel.findById(senderId);
    const receiver = await UserModel.findOne({ username: receiverUsername });

    if (!sender || !receiver) {
      throw new Error('User not found.');
    }

    if (sender.friends.includes(receiver.id)) {
      throw new Error('Users are already friends.');
    }

    if (sender.friendRequestsSent.includes(receiver.id)) {
      throw new Error('Friend request already sent.');
    }

    if (sender.friendRequestsReceived.includes(receiver.id)) {
      // Accept friend request
      sender.friends.push(receiver.id);
      receiver.friends.push(sender.id);
      sender.friendRequestsReceived = sender.friendRequestsReceived.filter((requestId) => requestId !== receiver.id);
      await sender.save();
      await receiver.save();
      return;
    }

    sender.friendRequestsSent.push(receiver.id);
    receiver.friendRequestsReceived.push(sender.id);

    await sender.save();
    await receiver.save();
  }

  public static async acceptFriendRequest(userId: string, friendId: string): Promise<void> {
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!user || !friend) {
      throw new Error('User not found.');
    }

    if (!user.friendRequestsReceived.includes(friend.id)) {
      throw new Error('Friend request not found.');
    }

    user.friends.push(friend.id);
    friend.friends.push(user.id);
    user.friendRequestsReceived = user.friendRequestsReceived.filter((requestId) => requestId !== friend.id);
    await user.save();
    await friend.save();
  }

  public static async removeFriend(userId: string, friendId: string): Promise<void> {
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);

    if (!user || !friend) {
      throw new Error('User not found.');
    }

    user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
    friend.friends = friend.friends.filter((friend) => friend.toString() !== userId);

    await user.save();
    await friend.save();
  }

  public static async blockUser(userId: string, blockedUserId: string): Promise<void> {
    const user = await UserModel.findById(userId);
    const blockedUser = await UserModel.findById(blockedUserId);

    if (!user || !blockedUser) {
      throw new Error('User not found.');
    }

    user.blockedUsers.push(blockedUserId);
    await user.save();
  }

  public static async unblockUser(userId: string, unblockedUserId: string): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    user.blockedUsers = user.blockedUsers.filter((blockedUser) => blockedUser.toString() !== unblockedUserId);
    await user.save();
  }
}

export default FriendshipService;
