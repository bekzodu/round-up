import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

export const fetchAdminStats = async () => {
  try {
    // Get total users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const totalUsers = usersSnapshot.size;

    // Get total points and calculate points growth
    let totalPoints = 0;
    let previousTotalPoints = 0;
    
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      totalPoints += userData.points || 0;
      
      // Check if points were updated in the last week
      if (userData.createdAt && userData.createdAt.toDate() < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        previousTotalPoints += 1000; // Initial points value
      }
    });

    const pointsGrowth = previousTotalPoints > 0 
      ? ((totalPoints - previousTotalPoints) / previousTotalPoints) * 100 
      : 0;

    // Get new users this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const newUsersQuery = query(
      collection(db, 'users'),
      where('createdAt', '>=', oneWeekAgo)
    );
    const newUsersSnapshot = await getDocs(newUsersQuery);
    const newUsers = newUsersSnapshot.size;

    // Calculate user growth
    const userGrowth = totalUsers > 0 
      ? (newUsers / totalUsers) * 100 
      : 0;

    return {
      totalUsers,
      totalPoints,
      newUsers,
      userGrowth,
      pointsGrowth
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalUsers: 0,
      totalPoints: 0,
      newUsers: 0,
      userGrowth: 0,
      pointsGrowth: 0
    };
  }
};