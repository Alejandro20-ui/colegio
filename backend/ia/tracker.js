let session_id = localStorage.getItem("ia_session");

if (!session_id) {
    session_id = crypto.randomUUID();
    localStorage.setItem("ia_session", session_id);
}

let inicio = Date.now();

function track(evento, tiempo = 0) {
    fetch("/backend/ia/registrar_evento.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            session_id,
            pagina: location.pathname,
            evento,
            tiempo
        })
    });
}

track("carga");

document.addEventListener("click", () => track("click"));

window.addEventListener("beforeunload", () => {
    let tiempo = Math.floor((Date.now() - inicio) / 1000);
    track("salida", tiempo);
});
