import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../redux/store";
import { removeTodoFavoritos } from "../redux/actions/personajesActions";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns la pagina de favoritos
 */
const PaginaFavoritos: FC = () => {
  const dispatch = useDispatch();

  const { favoritos } = useSelector((state) => state.personajes);

  useEffect(() => {
    if (favoritos) {
      console.log(favoritos);
    }
  }, [favoritos]);

  return (
    <div className="container">
      <div className="actions">
        <h3>Personajes Favoritos</h3>
        <button
          onClick={() => {
            dispatch(removeTodoFavoritos());
          }}
          className="danger"
        >
          Eliminar Favoritos
        </button>
      </div>
      <GrillaPersonajes listaPersonajes={favoritos} />
    </div>
  );
};

export default PaginaFavoritos;
