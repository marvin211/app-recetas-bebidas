import { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
    
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });
    
    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    //Función para leer el contenido del formulario
    const obtenerDatosReceta = ({target}) => {

        guardarBusqueda( {
            ...busqueda,
            [target.name]: target.value
        });
    }
    
    //Extraer los valores
    const { nombre, categoria } = categorias;

    return ( 
        <form
            className="col-12"
            onSubmit={ (e) => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true);
            }} 
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        name="nombre"
                        className="form-control"
                        placeholder="Buscar por Ingrediente"
                        onChange={ obtenerDatosReceta }
                        value = { nombre }
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={obtenerDatosReceta}
                        value = { categoria }

                    >
                        <option value="">-- Selecciona Categoría --</option>
                        { categorias.map( categoria => (              
                            <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >
                                {categoria.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"              
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;