import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #EB6864",
  boxShadow: 24,
  p: 4,

  overflow: "auto",
  maxHeight: "90vh",

  "&::-webkit-scrollbar": {
    width: "0.5em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#EB6864",
    borderRadius: "4px",
  },
};

const Receta = ({ receta }) => {
  //State para abrir y cerrar el modal.
  const [open, setOpen] = useState(false); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Extraer los valores del context
  const { recetainfo, guardarIdReceta, guardarReceta } = useContext(ModalContext); 

  //Muestra y formatea los ingredientes
  const mostrarIngredientes = (recetainfo) => {
    
    let ingredientes = [];

    for (let i = 1; i < 16; i++) {
      if (recetainfo[`strIngredient${i}`]) {
     
        ingredientes.push(
          <li key={`ingredient-${i}`}>
            {recetainfo[`strIngredient${i}`]} {recetainfo[`strMeasure${i}`]}
          </li> 
        );
      }
    }

    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>

        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          alt={`Imagen de ${receta.strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              guardarIdReceta(receta.idDrink); 
              handleOpen();
            }}
          >
            Ver Receta
          </button>

          <Modal
            open={open} 
            onClose={() => {
              guardarIdReceta(null); 
              guardarReceta({}); 
              handleClose(); 
            }}
          >
            <Box sx={style}>
              <div id="modal-modal-title" variant="h6" component="h2">
                <h2>{recetainfo.strDrink}</h2>
              </div>

              <div id="modal-modal-description" sx={{ mt: 2 }}>
                <h3 className="mt-4">Instrucciones</h3>
                <p> {recetainfo.strInstructions} </p>

                <img
                  className="img-fluid my-4"
                  src={recetainfo.strDrinkThumb}
                  alt={recetainfo.strDrink}
                />

                <h3>Ingredientes y cantidades</h3>
                <ul>
                  {mostrarIngredientes(recetainfo)}
                </ul>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
