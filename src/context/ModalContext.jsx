import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idreceta, guardarIdReceta] = useState(null); 
    
    //State para guardar la receta que se va a consultar.
    const [recetainfo, guardarReceta] = useState({}); 


    //Una vez que se tiene la receta, llamar la api
    useEffect(() => {

        const obtenerReceta = async () => {
            
            if(!idreceta) return; 

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]); 
        }

        obtenerReceta();

    }, [idreceta]);

    return ( 
        <ModalContext.Provider
            value={{
                recetainfo,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;