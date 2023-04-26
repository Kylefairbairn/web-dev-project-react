import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service";
import * as friendService from "../../services/friends-service";
import "./profile-screen.css";
import * as gameService from "../../services/create-game-service";
import * as userService from "../../services/users-services";
import PlayGameMock from "../home-screen/mock-game";

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState({});
    const [profileLoaded, setProfileLoad] = useState(false);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [correctPercentage, setCorrectPercentage] = useState(0);
    const [topCategory1, setTopCategory1] = useState("");
    const [topCategory2, setTopCategory2] = useState("");
    const [topCategory3, setTopCategory3] = useState("");
    const [topCategory1Score, setTopCategory1Score] = useState("");
    const [topCategory2Score, setTopCategory2Score] = useState("");
    const [topCategory3Score, setTopCategory3Score] = useState("");
    const [friends, setFriends] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const profile = await service.profile();
                setUserLoggedIn(profile);
                setProfileLoad(true);
                const userProfile = await gameService.getProfileData(profile._id);
                setGamesPlayed(userProfile.gamesPlayed);
                setTotalPoints(userProfile.points);
                const average = Math.round(
                    ((userProfile.score / userProfile.totalQuestions) * 100) / 10
                );
                setCorrectPercentage(average);


                const categoryCounts = userProfile.category.reduce((acc, cur) => {
                    acc[cur.category] = (acc[cur.category] || 0) + cur.freq;
                    return acc;
                }, {});

                const sortedCategories = Object.entries(categoryCounts)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([category, count]) => ({category, count}));


                // setTopCategory1(sortedCategories[0].category);
                // setTopCategory2(sortedCategories[1].category);
                // setTopCategory3(sortedCategories[2].category);
                // setTopCategory1Score(sortedCategories[0].count);
                // setTopCategory2Score(sortedCategories[1].count);
                // setTopCategory3Score(sortedCategories[2].count);

                if (sortedCategories.length > 0 && sortedCategories[0].category !== "") {
                    setTopCategory1(sortedCategories[0].category);
                    setTopCategory1Score(sortedCategories[0].count);
                }
                if (sortedCategories.length > 1 && sortedCategories[1].category !== "") {
                    setTopCategory2(sortedCategories[1].category);
                    setTopCategory2Score(sortedCategories[1].count);
                }
                if (sortedCategories.length > 2 && sortedCategories[2].category !== "") {
                    setTopCategory3(sortedCategories[2].category);
                    setTopCategory3Score(sortedCategories[2].count);
                }

                const userFriends = await friendService.findFriendsByUserID(profile._id);


                const promises = userFriends.map(async (friend) => {
                    const friendsData = await userService.findUserById(friend.friend);
                    return friendsData;
                });
                Promise.all(promises).then((friendsData) => {
                    setFriends(friendsData);
                });


            } catch (e) {
                // if(userLoggedIn === {}){
                //     navigate("/login")
                // }
                //navigate("/login")
            }
        }
        fetchData();

    }, [setUserLoggedIn]);

    const logout = () => {
        service.logout().then(() => navigate("/login"));
    };

    const handleEditClick = () => {
        navigate("/edit");
    };


    return (
        profileLoaded ? (

            <div className="profile-container">
                <div className="profile-name">
                    <h2 className="fw-bolder">Profile : {userLoggedIn.firstname}</h2>
                </div>

                <div className="profile-photo">
                    <img className="profile-photo" src={`/images/${userLoggedIn.profilePhoto}`} alt="" />
                </div>
                <div className="profile-username">
                    <h4>@{userLoggedIn.username}</h4>
                    <h4>Account Type: {userLoggedIn.role}</h4>
                </div>
                <div>
                    <button onClick={handleEditClick} className={"edit-btn rounded-pill"} >Edit Profile</button>
                </div>
                <div>
                    <button className="logout-btn btn rounded-pill" onClick={logout}>
                        Logout
                    </button>
                </div>
                <div className="profile-stats">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 border">
                            <h5>Games played</h5>
                            <p>{gamesPlayed}</p>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 border">
                            <h5>Total Points</h5>
                            <p>{totalPoints}</p>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 border">
                            <h5>Correct Percentage</h5>
                            <p>{correctPercentage}%</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 border">
                            <h5>Top Category 1</h5>
                            <p>
                                <span> {topCategory1 ? topCategory1 : ''}</span>
                                <span> {topCategory1Score} </span>
                            </p>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 border">
                            <h5>Top Category 2</h5>
                            <p>
                                <span> {topCategory2 ? topCategory2 : ''}  </span>
                                <span> {topCategory2Score} </span>
                            </p>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 border">
                            <h5>Top Category 3</h5>
                            <p>
                                <span> {topCategory3 ? topCategory3 : ''} </span>
                                <span> {topCategory3Score} </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="friends-list">
                    <h3>Friends: {friends.length} </h3>
                    <div className="row">
                        {friends.map((friend) => (
                            <div key={friend._id} className="col-4 col-md-3 col-lg-2 friend-col">
                                <Link to={`/profile/${friend._id}`}>
                                    <img
                                        className="friend-photo"
                                        src={`/images/${friend.profilePhoto}`}
                                        alt={`${friend.firstname} ${friend.lastname}`}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <PlayGameMock/>
        )
    );


};
export default ProfileScreen;

