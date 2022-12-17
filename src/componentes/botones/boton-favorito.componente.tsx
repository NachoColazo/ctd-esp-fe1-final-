import "./boton-favorito.css";
import Personaje from "../../types/characterType";
import {
  isAddFavorito,
  isChangeFavorito,
  isRemoveFavorito,
} from "../../redux/actions/personajesActions";
import { useDispatch } from "react-redux";

interface Props {
  esFavorito: boolean;
  personaje: Personaje;
  esFavoritoElPj: boolean;
}
interface onClick {
  onClick: (esFavorito: boolean) => void;
}

/**
 *
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 *
 * Deberás tipar las propiedades si usas este componente
 *
 * @param {Function} onClick
 * @param {boolean} esFavorito
 * @param {Personaje} personaje
 * @returns {React.ReactELement} un JSX element
 */
const BotonFavorito = ({
  esFavorito,
  onClick,
  personaje,
  esFavoritoElPj,
}: Props & onClick) => {
  const dispatch = useDispatch();

  const handleFavorito = () => {
    if (esFavorito === false) {
      dispatch(isAddFavorito(personaje));
      dispatch(isChangeFavorito(personaje));
      onClick(!esFavorito);
    } else {
      dispatch(isRemoveFavorito(personaje));
      onClick(!esFavorito);
    }
  };

  const src =
    esFavoritoElPj === true
      ? "/imagenes/star-filled.png"
      : "/imagenes/star.png";

  return (
    <div onClick={() => handleFavorito()} className="boton-favorito">
      <img src={src} alt={"favorito"} />
    </div>
  );
};

export default BotonFavorito;
