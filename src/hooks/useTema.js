import { useContext } from "react";
import { TemaContext } from "../contexts/TemaContext.js";

export function useTema() {
    const contexto = useContext(TemaContext);

    if (!contexto) {
        throw new Error("useTema deve ser utilizado dentro de um TemaProvider");
    }

    return contexto;
}
