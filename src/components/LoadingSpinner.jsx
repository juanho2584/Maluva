import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Cargando contenido..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "3rem", height: "3rem" }}
        className="mb-3"
      />
      <p className="text-muted fw-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
