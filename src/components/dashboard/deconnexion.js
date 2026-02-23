export function deconnexion(navigate) {
    localStorage.removeItem("token");
    navigate("/connexion");
}
