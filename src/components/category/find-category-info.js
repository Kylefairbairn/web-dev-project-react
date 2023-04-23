import React, {useEffect, useState} from "react";
import axios from "axios";

const FindCategoryInfo = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(9);
    const [categoryInformation, setCategoryInformation] = useState({});
    const [loading, setLoading] = useState(true);

    const categoryURL = "https://opentdb.com/api_category.php";

    const getCategories = async () => {
        const response = await axios.get(categoryURL);
        setCategories(response.data.trivia_categories);
    };

    const findCategoryInfo = async (category) => {
        const categoryInfo = `https://opentdb.com/api_count.php?category=${category}`;
        const response = await axios.get(categoryInfo);
        setCategoryInformation(response.data);
        setLoading(false);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleClick = () => {
        setLoading(true);
        findCategoryInfo(category);
    };

    return (
        <div className="game-container">
            <div className="game-form-styling">
                <h1>Category Search</h1>
                <div className="game-form-input-container">
                    <label>Choose a category</label>
                    <div>
                        <select
                            className="game-select-styling"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories
                                ? categories.map((eachCategory) => {
                                    return (
                                        <option
                                            key={eachCategory.id}
                                            value={eachCategory.id}
                                        >
                                            {eachCategory.name}
                                        </option>
                                    );
                                })
                                : null}
                        </select>
                    </div>
                </div>
                <button
                    className="game-form-submit-button"
                    onClick={handleClick}
                >
                    Search
                </button>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <h1>Category Results</h1>
                        Total Questions: {categoryInformation.category_question_count.total_question_count} <br />
                        Easy Questions: {categoryInformation.category_question_count.total_easy_question_count} <br />
                        Medium Questions: {categoryInformation.category_question_count.total_medium_question_count} <br />
                        Hard Questions: {categoryInformation.category_question_count.total_hard_question_count} <br />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindCategoryInfo;
