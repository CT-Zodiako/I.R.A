import { useState } from "react"

export const InputGeneral = ({onInputGeneral}) =>{
    
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     onChange( name , value );
    // };
  const [inputObjeto, setInputObjeto] = useState();

    const NewObjeto = (e) =>{
      setInputObjeto(e.target.value)
    }

    const enviarObjeto = () =>{
      onInputGeneral(inputObjeto)
    }

    return(
        <>
          <form onSubmit={enviarObjeto}>
            <input
              type="text"
              name={name}
              // value={value}
              onChange={NewObjeto}
            />
          </form>
        </>
    )
}