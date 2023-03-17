import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CategoriasContext = createContext(); 

const CategoriasProvider = props => {

    //Crear el state del context
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar el llamado a la API
    useEffect(() => {

        const obtenerCategorias = async () => {

            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks);
        }

        obtenerCategorias();

    }, []);

    return (
        <CategoriasContext.Provider 
            value={{
               categorias,
               guardarCategorias
            }}
        >
            {props.children} 

        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;