import { useState } from "react"

export const InputGeneral = ({}) =>{
    
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     onChange( name , value );
    // };
  const [inputObjeto, setInputObjeto] = useState();

    const onRegistroDato = (event) =>{
      setInputObjeto(event.target.value)
    }

    const enviarObjeto = () =>{
      onInputGeneral(inputObjeto)
    }

    return(
        <>
          <form onSubmit={enviarObjeto}>
            <input
              type="text"
              // name={name}
              // value={value}
              onChange={onRegistroDato}
            />
          </form>
        </>
    )
}