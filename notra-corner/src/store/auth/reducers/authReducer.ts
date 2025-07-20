import {
  CHECK_AUTH_FAILURE,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_USER,
} from "../actions/action";

interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        error: null,
        loading: false,
      };
    case CHECK_AUTH_REQUEST:
      return { ...state, loading: true };
    case CHECK_AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case CHECK_AUTH_FAILURE:
      return { ...state, loading: false, user: null };
    default:
      return state;
  }
};
