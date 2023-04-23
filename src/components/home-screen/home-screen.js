// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import * as service from '../../services/auth-service';
// import * as gameService from '../../services/game-service';
// import { Heart } from 'react-bootstrap-icons';
//
// const HomeScreen = () => {
//     const navigate = useNavigate();
//     const [profile, setProfile] = useState({});
//     const [friends, setFriends] = useState([]);
//     const [likedGames, setLikedGames] = useState([]);
//
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const profile = await service.profile();
//                 setProfile(profile);
//                 const friends = await service.findFriendsByUserID(profile.id);
//                 setFriends(friends);
//             } catch (e) {
//                 navigate('/signup');
//             }
//         }
//         fetchData();
//     }, [navigate]);
//
//
//     const handleLikeGame = (gameId) => {
//         if (likedGames.includes(gameId)) {
//             setLikedGames(likedGames.filter((id) => id !== gameId));
//         } else {
//             setLikedGames([...likedGames, gameId]);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Welcome {profile.username}</h1>
//             <h2>Friends</h2>
//             {friends.map((friend) => (
//                 <div key={friend.id}>
//                     <h3>{friend.username}</h3>
//                     {friend.games.map((game) => (
//                         <div key={game.id} style={{ border: '1px solid black', padding: '10px' }}>
//                             <h4>{game.name}</h4>
//                             <p>Score: {game.score}</p>
//                             <p>Total Questions: {game.totalQuestions}</p>
//                             <p>Category: {game.category}</p>
//                             <p>Points: {game.points}</p>
//                             <button onClick={() => handleLikeGame(game.id)}>
//                                 <Heart color={likedGames.includes(game.id) ? 'red' : 'gray'} size={24} />
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default HomeScreen;
