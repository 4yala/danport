//Load the header
fetch("components/header.html")
    .then(response => response.text())
    .then(html => {
        document.querySelector("#site-header").innerHTML = html;
    });

