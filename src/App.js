import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import MealsPage from "./components/mealsPage/MealsPage";
import Login from "./components/Login";
import GroceryPage from "./components/GroceryPage";
import SignUp from "./components/signup";
import ForgotPassword from "./components/forgotpassword";
import ResetPassword from "./components/resetpassword";
import ViewSuggestedMeals from "./components/ViewSuggestedMeals";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { setInitUrl, getUser } from "./store/actions";
import { connect } from "react-redux";
import axios from "./util/Api";
import { USER_DATA } from "./store/constants/ActionTypes";
require("dotenv").config();

class App extends Component {
  allMealNames = [];
  productNames = [
    "Spinach",
    "Brown Beans",
    "Ijebu Garri",
    "Honey Beans",
    "Kale",
    "Water",
    "Squash Potatoes",
    "Oregano",
    "Cashews",
    "Palm Oil",
    "Pineapple",
    "Onions",
    "Flour",
    "Butter",
    "Sugar",
    "Hawaiian Bread",
    "Avocados",
    "Tomatoes",
  ];
  productImageLink = [];
  categories = ["Baking", "Cooking", "Home", "Ethiopian", "Quick-Meal"];
  measurements = [
    "mL",
    "oz",
    "L",
    "cup(s)",
    "Tbsp",
    "tsp",
    "pt",
    "lb",
    "g",
    "kg",
    "lb",
    "qt",
    "gallon",
    "dash/pinch",
    "Leaves",
    "cloves",
    "cubes",
    "Large",
    "medium",
    "small",
  ];
  kitchenUtensils = [
    "Baking Sheet",
    "Colander",
    "Cooking Oil",
    "Cutting Board",
    "Fridge",
    "Knife Set",
    "Mixing Bowls",
    "Pot",
    "Pan",
    "Peeler",
    "Thermometer",
    "Wire Mesh",
    "Zester",
  ];
  // productDisplayBooleansOutOfState = [];
  availableLocations = [
    "African Carribean Market",
    "Abule",
    "Scotch Bonnet Restaurant",
    "Ralphs",
    "Target",
    "Walmart",
    "Vons",
  ];

  groceryList = [];
  locationAddressComponent = [];

  constructor(props) {
    super(props);

    this.state = {
      suggestMealPopOver: false,
      isAuthenticated: false,
      customerId: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + nextProps.token;
    }

    if (nextProps.token && !nextProps.authUser) {
      this.props.getUser();
    }
  }

  componentDidMount() {
    var userToken = window.localStorage.getItem("accessToken");

    if (userToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + userToken;
      this.props.setAuthUser(jwt_decode(userToken))
    }
  }

  render() {
    const { customer_id } = this.props;
    const items = [];
    var userRole = window.localStorage.getItem("userRole");
    // var userToken = window.localStorage.getItem("userToken");

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/login" render={() => <Login openFlag={true} />} />
          <Route
            exact
            path="/admin"
            render={(props) => {
              return customer_id !== undefined && userRole === "admin" ? (
                <AdminPanel {...props} />
              ) : (
                <Redirect to={{ pathname: "#" }} />
              );
            }}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <SignUp {...props} />}
          />
          <Route
            exact
            path="/resetpass"
            render={(props) => <ResetPassword {...props} />}
          />
          <Route
            exact
            path="/forgotpass"
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route path="/home" render={(props) => <HomePage {...props} />} />
          <Route path="/v2" render={() => <MealsPage />} />
          <Route
            exact
            path="/grocery"
            render={() => {
              return customer_id !== undefined || customer_id !== "null" ? (
                <GroceryPage />
              ) : (
                <Redirect to={{ pathname: "#" }} />
              );
            }}
          />
          <Route
            exact
            path="/ViewSuggestedMeals"
            render={(props) => <ViewSuggestedMeals />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}
// export default App;

const mapStateToProps = ({ auth }) => {
  // const { authUser, token, initURL } = auth;
  const { authUser, token, role, customer_id } = auth;
  return { authUser, role, token, customer_id };
};
const mapDispatchToProps = (dispatch) => ({
  setInitUrl,
  getUser,
  setAuthUser: (data) => dispatch({ type: USER_DATA, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
