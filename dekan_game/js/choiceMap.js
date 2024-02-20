document.getElementById("nameInput").addEventListener("input", function() {
    let name = document.getElementById("nameInput").value;
    if (name.trim() !== "") {
        document.querySelectorAll("button").forEach(button => {
            button.removeAttribute("disabled");
        });
    } else {
        document.querySelectorAll("button").forEach(button => {
            button.setAttribute("disabled", "true");
        });
    }
});

function selectMap(map) {
    window.location.href = 'index.html?selectedMap=' + map;
}