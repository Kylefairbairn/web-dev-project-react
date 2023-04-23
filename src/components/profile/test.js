// const fetchUser = async () => {
//     const response = await userService.findUserById(uid)
//     setUser(response)
// }
//
// const getGameData = async () => {
//     const userProfile = await gameService.getProfileData(user._id);
//
//     setGamesPlayed(userProfile.gamesPlayed);
//     setTotalPoints(userProfile.points);
//     const average = Math.round(
//         ((userProfile.score / userProfile.totalQuestions) * 100) / 10
//     );
//     setCorrectPercentage(average);
//
//     const categoryCounts = userProfile.category.reduce((acc, cur) => {
//         acc[cur.category] = (acc[cur.category] || 0) + cur.freq;
//         return acc;
//     }, {});
//
//     const sortedCategories = Object.entries(categoryCounts)
//         .sort(([, a], [, b]) => b - a)
//         .slice(0, 3)
//         .map(([category, count]) => ({category, count}));
//
//     setTopCategory1(sortedCategories[0].category);
//     setTopCategory2(sortedCategories[1].category);
//     setTopCategory3(sortedCategories[2].category);
//     setTopCategory1Score(sortedCategories[0].count);
//     setTopCategory2Score(sortedCategories[1].count);
//     setTopCategory3Score(sortedCategories[2].count);
//
// }
//
// const findFriends = async () => {
//     const userFriends = await friendService.findFriendsByUserID(user._id);
//     console.log(userFriends)
//     const promises = userFriends.map(async (friend) => {
//         const friendsData = await userService.findUserById(friend.friend);
//         return friendsData;
//     });
//     Promise.all(promises).then((friendsData) => {
//         setFriends(friendsData);
//     });
// }

// useEffect(() => {
//     async function fetchData() {
//         try {
//             const response = await userService.findUserById(uid)
//
//             setProfileLoad(true)
//
//             console.log(response)
//             setUser(response)
//
//             const userProfile = await gameService.getProfileData(user._id);
//
//             setGamesPlayed(userProfile.gamesPlayed);
//             setTotalPoints(userProfile.points);
//             const average = Math.round(
//                 ((userProfile.score / userProfile.totalQuestions) * 100) / 10
//             );
//             setCorrectPercentage(average);
//
//             const categoryCounts = userProfile.category.reduce((acc, cur) => {
//                 acc[cur.category] = (acc[cur.category] || 0) + cur.freq;
//                 return acc;
//             }, {});
//
//             const sortedCategories = Object.entries(categoryCounts)
//                 .sort(([, a], [, b]) => b - a)
//                 .slice(0, 3)
//                 .map(([category, count]) => ({category, count}));
//
//             setTopCategory1(sortedCategories[0].category);
//             setTopCategory2(sortedCategories[1].category);
//             setTopCategory3(sortedCategories[2].category);
//             setTopCategory1Score(sortedCategories[0].count);
//             setTopCategory2Score(sortedCategories[1].count);
//             setTopCategory3Score(sortedCategories[2].count);
//
//             const userFriends = await friendService.findFriendsByUserID(user._id);
//             console.log(userFriends)
//             const promises = userFriends.map(async (friend) => {
//                 const friendsData = await userService.findUserById(friend.friend);
//                 return friendsData;
//             });
//             Promise.all(promises).then((friendsData) => {
//                 setFriends(friendsData);
//             });
//
//         } catch (e) {
//             console.log("An error occurred")
//         }
//         await fetchData()
//     }
//
// }, [uid])

// useEffect(() => {
//     fetchUser()
//     //getGameData()
//     // findFriends()
//
// }, [user])