import React, { useEffect, useState } from "react";
import { getRecipiesData } from "../services/recipies.service";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";

function Recipies() {
  const [recipiesData, setRecipiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [query, setQuery] = useState("");
  const [cartData, setCartData] = useState([]);
  const [cartClick, setCartClick] = useState(false);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);

  const search = (recipieData) => {
    return recipieData.filter(
      (recipieData) =>
        recipieData.cuisine.toLowerCase().includes(query) ||
        recipieData.mealType[0].toLowerCase().includes(query) ||
        recipieData.name.toLowerCase().includes(query)
    );
  };

  useEffect(() => {
    async function data() {
      try {
        let recipiesDataList = await getRecipiesData();
        setRecipiesData(search(recipiesDataList));
        setData(recipiesDataList);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log("hey error", e);
        setError("Error while fetching data ");
      }
    }
    data();
  }, [query]);

  if (isLoading) {
    return (
      <div className="container text-center " style={{ marginTop: "100px" }}>
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <p className="p-5 text-center">
          <img src={errorSymbol} alt="Loading ... " style={{ opacity: 0.5 }} />
          {error}
        </p>
      </div>
    );
  }

  const addToCart = (foodData) => {
    console.log("Added to cart");
    setCount(count + 1);
    setCartData((prevFoodData) => [...prevFoodData, foodData], 0);
  };

  const openCartDetail = () => {
    if (cartClick) {
      setRecipiesData(search(data));
    } else {
      setRecipiesData(search(cartData));
    }
    setCartClick(!cartClick);
  };

  return (
    <div className="container-fluid p-0 " id="recipies">
      <div className="d-flex justify-content-between main-header">
        <div className="search-header">
          <i className="fa fa-search search-icon"></i>
          <input
            type="text"
            className="form-control p-3 my-3 ms-0 search-field"
            placeholder="Search ..."
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <i className="count">{count}</i>
        <i
          className="fa fa-shopping-cart cart-symbol p-3 m-3"
          onClick={() => openCartDetail()}
        ></i>
      </div>

      <div
        className="card card1-data justify-content-around"
        style={{ marginTop: "60px" }}
      >
        {recipiesData &&
          recipiesData.map((recipieData, index) => (
            <div
              key={index}
              className="user-data1 data1 m-3 p-3 d-flex flex-column flex-xl-row recipie-data"
              onClick={() => addToCart(recipieData)}
            >
              <div className="user-photo d-flex flex-column justify-content-center align-items-center h-100">
                {recipieData.id}
                <img
                  src={recipieData.image}
                  alt="UserImage"
                  className="h-75 user-image"
                />
                <b className="userName">{recipieData.name}</b>
              </div>
              <div
                className="align-self-center user-details1 d-flex justify-content-around"
                style={{ gap: "30px" }}
              >
                <div>
                  <div>
                    <b> Cuisine: </b>
                    {recipieData.cuisine}
                  </div>
                  <div>
                    <b> MealType: </b>
                    {recipieData.mealType}
                  </div>
                  <div>
                    <b> PrepTimeMinutes: </b>
                    {recipieData.prepTimeMinutes}
                  </div>
                  <div>
                    <b> CookTimeMinutes: </b>
                    {recipieData.cookTimeMinutes}
                  </div>
                  <div>
                    <b> CaloriesPerServing: </b>
                    {recipieData.caloriesPerServing}
                  </div>
                </div>
                <div>
                  <div>
                    <b>Tags: </b>
                    {recipieData.tags.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </div>
                  <div>
                    <b> Rating: </b>
                    {recipieData.rating}
                  </div>
                  <div>
                    <b> ReviewCount: </b>
                    {recipieData.reviewCount}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Recipies;
