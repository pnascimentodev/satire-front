
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name"); 

    if (token) {
        if (name) {
            document.querySelector("h1").innerText = `Olá, ${name}`;
        } else {
            console.error('Nome do usuário não encontrado no localStorage.');
        }
        window.location.href = "pages/dashboard.html";
    }
});