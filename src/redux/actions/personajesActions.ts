import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import { buscarPersonajesAPI, cambiarPaginaApi } from "../../services/personajeService";
import { IRootState } from "../store";
import Personaje from "../../types/characterType";
import InfoPage from "../../types/infoPageType";

export interface IsFetchingPersonajes extends Action {
  type: "IS_FETCHING_PERSONAJES";
  payload: { name: string };
}

export interface IsSuccessPersonajes extends Action {
  type: "IS_SUCCESS_PERSONAJES";
  payload: {
    personajes: Personaje[];
    infoPage: InfoPage;
  };
}

export interface IsErrorPersonajes extends Action {
  type: "IS_ERROR_PERSONAJES";
  payload: { error: string };
}

export interface AddFavorito extends Action {
  type: "ADD_FAVORITO";
  payload: Personaje;
}

export interface ChangeFavorito extends Action {
  type: "CHANGE_FAVORITO";
  payload: Personaje;
}

export interface RemoveFavorito extends Action {
  type: "REMOVE_FAVORITO";
  payload: Personaje;
}

export interface RemoveTodoFavoritosAction extends Action {
  type: "REMOVE_TODO_FAVORITOS";
}

export interface getPersonajesAccion extends Action {
  type: "GET_PERSONAJES";
  payload: { busqueda: string };
}

export const isFetchingPersonajes: ActionCreator<IsFetchingPersonajes> = (
  name: string
) => {
  return {
    type: "IS_FETCHING_PERSONAJES",
    payload: { name: name },
  };
};

export const isSuccessPersonajes: ActionCreator<IsSuccessPersonajes> = (
  personajes: Personaje[],
  infoPage: InfoPage
) => {
  return {
    type: "IS_SUCCESS_PERSONAJES",
    payload: {
      personajes: personajes,
      // .map((e)=>{
      //     return ({
      //         name: e.name,
      //         id: e.id,
      //         status: e.status,
      //         image: e.image,
      //     })
      // })
      infoPage: infoPage,
    },
  };
};

export const isErrorPersonajes: ActionCreator<IsErrorPersonajes> = (
  error: string
) => {
  return {
    type: "IS_ERROR_PERSONAJES",
    payload: { error: error },
  };
};

export const isAddFavorito: ActionCreator<AddFavorito> = (
  personaje: Personaje
) => {
  return {
    type: "ADD_FAVORITO",
    payload: personaje,
  };
};

export const isChangeFavorito: ActionCreator<ChangeFavorito> = (
  personaje: Personaje
) => {
  return {
    type: "CHANGE_FAVORITO",
    payload: personaje,
  };
};

export const isRemoveFavorito: ActionCreator<RemoveFavorito> = (
  personaje: Personaje
) => {
  return {
    type: "REMOVE_FAVORITO",
    payload: personaje,
  };
};

export const removeTodoFavoritos: ActionCreator<RemoveTodoFavoritosAction> = () => {
  return {
    type: "REMOVE_TODO_FAVORITOS",
  };
};

export const getPersonajes: ActionCreator<getPersonajesAccion> = (
  name: string
) => {
  return {
    type: "GET_PERSONAJES",
    payload: {
      busqueda: name,
    },
  };
};

export type PersonajesAction =
  | ReturnType<typeof isFetchingPersonajes>
  | ReturnType<typeof isSuccessPersonajes>
  | ReturnType<typeof isErrorPersonajes>
  | ReturnType<typeof isAddFavorito>
  | ReturnType<typeof isChangeFavorito>
  | ReturnType<typeof isRemoveFavorito>
  | ReturnType<typeof removeTodoFavoritos>
  | ReturnType<typeof getPersonajes>;

  
export interface SearchCharactersThunks extends ThunkAction<void, IRootState, unknown, PersonajesAction> {}

export const searchCharactersThunks = (
  name: string
): SearchCharactersThunks => {
  return async (dispatch, getState) => {
    dispatch(getPersonajes(name));
    try {
      dispatch(isFetchingPersonajes(name));
      const response = await buscarPersonajesAPI(name);

      const [personajes, info] = response;
      dispatch(isSuccessPersonajes(personajes, info));
    } catch (error) {
      dispatch(isErrorPersonajes(error));
    }
  };
};

export const changePageThunk = (
  url: string
  ): SearchCharactersThunks => {
  return async (dispatch, getState) => {
    try {
      const [personajes, info] = await cambiarPaginaApi(url);
      dispatch(isSuccessPersonajes(personajes, info));
    } catch (e) {
      dispatch(isErrorPersonajes(e));
    }
  };
};