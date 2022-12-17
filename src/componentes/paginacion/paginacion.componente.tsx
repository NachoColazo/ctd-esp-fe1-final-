import { FC } from "react";
import { useDispatch } from "react-redux";
import { changePageThunk } from "../../redux/actions/personajesActions";
import { useSelector } from "../../redux/store";

import "./paginacion.css";

/**
 * Componente que contiene los botones para paginar
 *
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 *
 *
 * @returns {React.ReactElement} JSX element
 */
const Paginacion: FC = () => {
  const dispatch = useDispatch();

  const infoPage = useSelector((estado) => estado.personajes.infoPage);

  const { next, prev } = infoPage;

  const paginaAnterior = () => {
    dispatch(changePageThunk(prev));
  };

  const paginaPosterior = () => {
    dispatch(changePageThunk(next));
  };

  return (
    <div className="paginacion">
      <button
        onClick={paginaAnterior}
        disabled={prev === null ? true : false}
        className={"primary"}
      >
        Anterior
      </button>
      <button
        onClick={paginaPosterior}
        disabled={next === null ? true : false}
        className={"primary"}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
