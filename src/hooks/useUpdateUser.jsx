import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUpdateUser() {
    return useContext(UserContext);
}
