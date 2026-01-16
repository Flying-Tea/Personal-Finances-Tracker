import { useEffect } from "react";
import { logout } from "./auth";

export function useAutoLogout(){
    useEffect(() => {
        const expiration = localStorage.getItem("expiresAt");

        if (!expiration) return;

        const expiry = Number(expiration);
        const now = Date.now();

        if (now >= expiry) {
            logout();
            return;
        }

        const timeout = setTimeout(() => {
            logout();
        }, expiry - now);

        return () => clearTimeout(timeout);
        }, []
    );
}
