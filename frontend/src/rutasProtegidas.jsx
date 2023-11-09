import { Navigate, Outlet } from "react-router-dom";

const ProteccionRuta = ({ rolesPermitidos, ...rest }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  } else {
    const verificarRol = (rolesPermitidos, rolUsuario) => {
      return rolesPermitidos && rolesPermitidos.includes(rolUsuario);
    };

    const rolToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenData = token.split(".")[1];
        const decodedToken = JSON.parse(atob(tokenData));
        const rol =decodedToken.sub.rol;
        
        return rol;
      }
      return null;
    };

    const rolUsuario = rolToken();

    if (!verificarRol(rolesPermitidos, rolUsuario)) {
      return <Navigate to="/" />;
    }
    return <Outlet/>;
  }
};

export default ProteccionRuta; 
