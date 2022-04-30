import {
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  USER_ROLE,
  CUSTOMER_ID,
  EMAIL_VERIFICATION_MESSAGE,
} from "../constants/ActionTypes";

const INIT_STATE = {
  token: JSON.parse(localStorage.getItem("token")),
  initURL: "",
  authUser: null,
  loading: true,
  isAuthenticated: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL:
      return {
        ...state,
        initURL: action.payload,
      };
    case SIGNOUT_USER_SUCCESS: {
      localStorage.clear();
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: "",
        loading: false,
        isAuthenticated: false,
      };
    }
    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
        loading: false,
        isAuthenticated: !!Object.keys(action.payload).length,
      };
    }
    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case USER_ROLE: {
      return {
        ...state,
        role: action.payload,
      };
    }
    case CUSTOMER_ID: {
      return {
        ...state,
        customer_id: action.payload,
      };
    }
    default:
      return state;
  }
};
