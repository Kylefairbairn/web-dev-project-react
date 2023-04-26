import PlayGameMock from "./mock-game";
import { useNavigate } from "react-router-dom";
import "./home-screen.css";
import React, { useEffect, useState } from "react";
import * as LoggedInService from "../../services/auth-service";
import * as service from "../../services/friends-service";
import * as gameService from "../../services/create-game-service";
import * as likeService from "../../services/likes-service";
import * as userService from "../../services/users-services";
import * as profileService from "../../services/profile-service"
import {findProfileByUserId} from "../../services/profile-service";


const WelcomeScreen = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [friends, setFriends] = useState([]);
    const [likedGames, setLikedGames] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await LoggedInService.profile();
                setProfile(profile);


                setProfileLoaded(true);
                const friends = await service.findFriendsByUserID(profile._id);

                setFriends(friends);

                const haveProfile = await profileService.findProfileByUserId(profile._id)
                console.log(haveProfile)

                if(haveProfile === null){
                    const newProfile = {
                        "user": profile._id,
                    }

                    try {

                        //const createPro = await profileService.createProfile(newProfile)
                    }
                    catch (e){
                        console.log("not found ")
                    }
                }
            } catch (e) {
                //navigate('/signup');
            }
        }
        fetchData();
    }, [navigate]);

    useEffect(() => {}, [profile]);

    useEffect(() => {
        async function fetchGames() {
            const friendGames = [];
            for (const friend of friends) {
                const games = await gameService.findGamesByUserId(friend.friend);
                const temp = await userService.findUserById(friend.friend);
                for (const game of games) {
                    friendGames.push({ ...game, friendId: friend.id });
                }
            }

            setGames(friendGames);
        }
        if (friends.length > 0) {
            fetchGames();
        }
    }, [friends]);

    const handleLikeGame = async (gameId) => {
        try {
            const like = { user: profile._id, game: gameId };
            const existingLike = likedGames.find((like) => like.game === gameId);
            if (existingLike) {
                await likeService.deleteLike(existingLike._id);
                setLikedGames((prevLikedGames) =>
                    prevLikedGames.filter((like) => like.game !== gameId)
                );
                setGames((prevGames) =>
                    prevGames.map((game) => {
                        if (game.id === gameId) {
                            return { ...game, liked: false };
                        }
                        return game;
                    })
                );
            } else {
                const newLike = await likeService.likeGame(like);
                setLikedGames((prevLikedGames) => [...prevLikedGames, newLike]);
                setGames((prevGames) =>
                    prevGames.map((game) => {
                        if (game.id === gameId) {
                            return { ...game, liked: true };
                        }
                        return game;
                    })
                );
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        async function fetchLikedGames() {
            try {
                const likedGames = await likeService.getLikesbyUser(profile._id);
                setLikedGames(likedGames);
            } catch (e) {
                console.error(e);
            }
        }
        if (profile._id) {
            fetchLikedGames();
        }
    }, [profile]);



    const handleAddGems = () => {
        navigate("/gems")
    }

    return (
        profileLoaded === false ? (
            <div>
                <h1 className="Welcome-Message">Welcome to Trivia Mania</h1>
                <PlayGameMock />
            </div>
        ) : (
            <div className="home-screen">
                <div className= "home-screen__new-box">
                   <div className="icon">
                        <img className="icon" src={`/images/${profile.profilePhoto}`} alt="" />
                    </div>
                    <h2 className="welcome-message" >Welcome @{profile.username}</h2>
                    <div className={"current-gems"}>
                    <i className="bi bi-suit-diamond-fill"></i>
                        {profile.gems}
                    </div>
                </div>
                <div className="home-upgrade__new-box">
                    <div className="home-upgrade__new-box__icon">
                        <i className="bi bi-suit-diamond-fill"></i>
                    </div>
                    <div className="home-upgrade__new-box__text">
                        <h2>Add Gems</h2>
                        <p>Add gems to challenge your friends to a trivia battle.</p>
                    </div>
                    <button onClick={handleAddGems} className="home-upgrade__new-box__button">Add Gems</button>
                </div>
                <div className="content-container">
                    <h3>Friends Popular Games</h3>
                    <i className="bi bi-fire"></i>
                    <div className="d-flex flex-wrap content">
                        {games.map((game) => {
                            const gameLiked = likedGames.some((like) => like.game === game._id);

                            return (
                                <div key={game._id} className="home-screen__game-card card m-2">
                                    <div className="card-body">
                                        <h4 className="home-screen__game-card__title card-title">@{game.username}</h4>
                                        <h6 className="">
                                            Game Title: {game.name}
                                        </h6>
                                        <p className="home-screen__game-card__text card-text">
                                            Score: {game.score} | Total Questions: {game.totalQuestions} | Category: {game.category} | Points: {game.points}
                                        </p>
                                        <button
                                            className={`btn btn-sm btn-${gameLiked ? "danger" : "outline-secondary"} home-screen__game-card__like-button`}
                                            onClick={() => handleLikeGame(game._id)}
                                        >
                                            <i className="bi bi-heart" style={{color: gameLiked ? "red" : "black"}}/>
                                            {gameLiked ? "Liked" : "Like"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    );
}
export default WelcomeScreen

