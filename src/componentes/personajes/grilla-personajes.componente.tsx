import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchCharactersThunks } from "../../redux/actions/personajesActions";
import { useSelector } from "../../redux/store";
import Personaje from "../../types/characterType";
import "./grilla-personajes.css";
import TarjetaPersonaje from "./tarjeta-personaje.componente";

/**
 * Grilla de personajes para la pagina de inicio
 *
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 *
 * @param {Object[]} listaPersonajes props
 * @returns {React.ReactElement} un JSX element
 */
const GrillaPersonajes: FC<{ listaPersonajes: Personaje[] }> = ({
  listaPersonajes,
}) => {
  // const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const { status, favoritos } = useSelector((state) => state.personajes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCharactersThunks(""));
  }, [dispatch]);

  if (status === "idle")
    return <div>Haz una búsqueda para ver los personajes...</div>;

  if (status === "fetching") return <div>Cargando, por favor espere...</div>;

  if (status === "error") return <div>Hubo un error</div>;

  if (!listaPersonajes || listaPersonajes.length === 0)
    return <div>No se encontraron personajes</div>;

  return (
    <div className="grilla-personajes">
      {listaPersonajes.map((e) => {
        return (
          <div id={`${e.id}`}>
            <TarjetaPersonaje
              favoritos={favoritos}
              personaje={e}
              nombre={e.name}
              image={e.image}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GrillaPersonajes;
