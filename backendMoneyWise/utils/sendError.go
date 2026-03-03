package utils

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Message string `json:"message"`
}

func SendError(w http.ResponseWriter, err error, code int) {
	errorStruct := ErrorResponse{Message: err.Error()}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(errorStruct)
}
