import { Reducer } from "@reduxjs/toolkit";
import { PersonajesAction } from "../actions/personajesActions";
import Personaje from "../../types/characterType";
import InfoPage from "../../types/infoPageType";

export interface PersonajesState {
  busqueda: string;
  status: "idle" | "fetching" | "success" | "error";
  personajes: Personaje[];
  infoPage: InfoPage;
  error: string | null;
  favoritos: Personaje[];
}

const initialState: PersonajesState = {
  busqueda: "",
  status: "idle",
  personajes: [],
  infoPage: { count: 0, pages: 0, next: "0", prev: "1" },
  error: null,
  favoritos: [],
};

/**
 * Funciones reductora de los personajes
 *
 * @param {State} state
 * @param {DataStore.Reducer<PersonajesState, PersonajesAction>} action
 * @returns {State} un estado
 */

const personajesReducer: Reducer<PersonajesState, PersonajesAction> = (
  state = initialState,
  action
): PersonajesState => {
  switch (action.type) {
    case "IS_FETCHING_PERSONAJES":
      return {
        ...state,
        busqueda: action.payload.name,
        status: "fetching",
        personajes: [],
        error: null,
      };

    case "IS_SUCCESS_PERSONAJES":
      return {
        ...state,
        status: "success",
        personajes: action.payload.personajes,
        infoPage: action.payload.infoPage,
        error: null,
      };

    case "IS_ERROR_PERSONAJES":
      return {
        ...state,
        status: "error",
        error: action.payload.error,
        personajes: [],
      };

    case "ADD_FAVORITO":
      return {
        ...state,
        favoritos: [
          action.payload,
          ...state.favoritos.filter((e) => e.id !== action.payload.id),
        ],
        //[...state.favoritos, action.payload]
      };

    case "CHANGE_FAVORITO":
      return {
        ...state,
        personajes: [...state.personajes, action.payload],
      };

    case "REMOVE_FAVORITO":
      return {
        ...state,
        favoritos: state.favoritos.filter(
          (personaje) => personaje.id !== action.payload.id
        ),
      };

    case "REMOVE_TODO_FAVORITOS":
      return {
        ...state,
        favoritos: [],
      };
      
    default:
      return { ...state };
  }
};
export default personajesReducer;
