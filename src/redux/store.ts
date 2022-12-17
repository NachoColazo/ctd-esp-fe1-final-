import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import personajesReducer from "./reducers/personajesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  personajes: personajesReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
