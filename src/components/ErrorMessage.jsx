import React from "react";
import { Alert, Button } from "react-bootstrap";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="container py-5 my-5">
      <Alert
        variant="danger"
        className="border-0 shadow-sm rounded-4 p-4 text-center"
      >
        <AlertCircle size={48} className="text-danger mb-3" />
        <h4 className="fw-bold mb-3">¡Uy! Algo salió mal</h4>
        <p className="mb-4">
          {message ||
            "Hubo un error al cargar la información. Por favor, intenta de nuevo."}
        </p>
        {onRetry && (
          <Button
            variant="danger"
            className="rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
            onClick={onRetry}
          >
            <RefreshCw size={18} />
            Reintentar
          </Button>
        )}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
