import Personaje from "../types/characterType";
import InfoPage from "../types/infoPageType";

/**
 *
 * @param {string} nombre
 * @returns {Promise<[Personaje[], PageInfo] | [any, any]>, }
 */

export const buscarPersonajesAPI = async (
  nombre: string
): Promise<[Personaje[], InfoPage] | [any, any]> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${nombre}`
  );
  if (!response.ok) {
    return [
      [],
      {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
    ];
  }
  const data = await response.json();
  return [data.results, data.info];

  // return fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
  //   .then(data => data.json())
  //   .then(data => [data.results, data.info])
};

/**
 * Función que devuelve los personajes por página
 * @param {string} url
 * @returns {Promise<[Personaje[], InfoPage]>  | [any, any]}
 */

export const cambiarPaginaApi = async (
  url: string
): Promise<[Personaje[], InfoPage] | [any, any]> => {
  const response = await fetch(url);
  if (!response.ok) {
    return [
      [],
      {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
    ];
  }
  const data = await response.json();
  return [data.results, data.info];
};
