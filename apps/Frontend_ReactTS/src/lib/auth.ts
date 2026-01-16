export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("email");

    window.location.href = "/";
}