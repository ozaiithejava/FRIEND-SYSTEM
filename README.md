# FRIEND-SYSTEM
friends system in ts

## Usage:
```TypeScript
// index.ts
import mongoose from 'mongoose';
import UserModel from './UserModel';
import FriendshipService from './FriendshipService';

async function main() {
  try {
    // MongoDB bağlantısı
    await mongoose.connect('mongodb://localhost:27017/friendshipdb', { useNewUrlParser: true, useUnifiedTopology: true });

    // Kullanıcıları oluştur
    const user1 = new UserModel({
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123', // Bu gerçek bir şifre değeridir, güvenlik açısından hash kullanılmalıdır.
      fullName: 'User One',
    });

    const user2 = new UserModel({
      username: 'user2',
      email: 'user2@example.com',
      password: 'password456', // Bu gerçek bir şifre değeridir, güvenlik açısından hash kullanılmalıdır.
      fullName: 'User Two',
    });

    await user1.save();
    await user2.save();

    // Arkadaşlık işlemleri
    await FriendshipService.sendFriendRequest(user1.id, 'user2');
    await FriendshipService.acceptFriendRequest(user2.id, user1.id);

    const friendsList = await FriendshipService.getFriends(user1.id);
    const areFriends = await FriendshipService.isFriends(user1.id, user2.id);
    const pendingRequests = await FriendshipService.getPendingFriendRequests(user2.id);
    const blockedUsers = await FriendshipService.getBlockedUsers(user1.id);

    console.log('Friends List:', friendsList);
    console.log('Are Friends:', areFriends);
    console.log('Pending Requests:', pendingRequests);
    console.log('Blocked Users:', blockedUsers);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    // MongoDB bağlantısını kapat
    mongoose.disconnect();
  }
}

// Ana fonksiyonu çalıştır
main();
```
