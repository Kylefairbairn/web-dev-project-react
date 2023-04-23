import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as gameService from "../../services/create-game-service";
import * as friendService from "../../services/friends-service";
import * as userService from "../../services/users-services";

const VisitingProfile = () => {
    const {uid} = useParams();
    const [user, setUser] = useState(null);
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
        let isMounted = true;

        async function fetchData() {
            try {
                const response = await userService.findUserById(uid);
                const userProfile = await gameService.getProfileData(response._id);
                const userFriends = await friendService.findFriendsByUserID(response._id);

                if (isMounted) {
                    setUser(response);
                    setGamesPlayed(userProfile.gamesPlayed);
                    setTotalPoints(userProfile.points);
                    setCorrectPercentage(
                        Math.round((userProfile.score / userProfile.totalQuestions) * 10) / 10
                    );

                    const categoryCounts = userProfile.category.reduce((acc, cur) => {
                        acc[cur.category] = (acc[cur.category] || 0) + cur.freq;
                        return acc;
                    }, {});

                    const sortedCategories = Object.entries(categoryCounts)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([category, count]) => ({ category, count }));

                    setTopCategory1(sortedCategories[0]?.category);
                    setTopCategory2(sortedCategories[1]?.category);
                    setTopCategory3(sortedCategories[2]?.category);
                    setTopCategory1Score(sortedCategories[0]?.count);
                    setTopCategory2Score(sortedCategories[1]?.count);
                    setTopCategory3Score(sortedCategories[2]?.count);

                    const promises = userFriends.map(async (friend) => {
                        const friendsData = await userService.findUserById(friend.friend);
                        return friendsData;
                    });

                    const friendsData = await Promise.all(promises);
                    setFriends(friendsData);
                    setProfileLoad(true)
                }
            } catch (e) {
                console.log("An error occurred", e);
            }
        }

        fetchData();

        return () => {
            isMounted = false;
            setUser(null);
            setGamesPlayed(0);
            setTotalPoints(0);
            setCorrectPercentage(0);
            setTopCategory1("");
            setTopCategory2("");
            setTopCategory3("");
            setTopCategory1Score("");
            setTopCategory2Score("");
            setTopCategory3Score("");
            setFriends([]);
        };
    }, [uid]);


    return (

            profileLoaded ? (

            <div className="profile-container">
                <div className="profile-name">
                    <h2 className="fw-bolder">Profile : {user.firstname}</h2>
                </div>
                <div className="profile-photo">
                    <img className="profile-photo" src={`/images/${user.profilePhoto}`} alt="" />
                </div>
                <div className="profile-username">
                    <h5>@{user.username}</h5>
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
            ) :
                <h1>Profile loading</h1>
    );

}
export default VisitingProfile;