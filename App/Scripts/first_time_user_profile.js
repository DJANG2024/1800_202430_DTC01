
function process_response() {

    // x = document.getElementById("description")
    // y = document.createElement('div')
    // y.innerHTML = "testing"

    // z = document.createElement("input")
    // z.classList.add("text-center")
    // z.innerHTML = "Description"
    // y.appendChild(z);
    // x.appendChild(y);

    // z = document.createElement("form")

    // z.id = "description"
    // z.innerHTML = "View More!"



    // y.classList.add("text-center")
    // y.appendChild(z)

    // x.appendChild(y);

    // if (document.getElementById('bordered-radio-1').checked) {
    //     const x = document.getElementById("description");
    //     //x.classList.add("hidden")
    //     x.style.visibility = "visible";

    // } else if (document.getElementById('bordered-radio-2').checked) {
    //     const x = document.getElementById("description");
    //     //x.classList.add("visible")
    //     x.style.visibility = "visible";
    // }

    var checked = document.getElementById('bordered-radio-1').checked;
    const x = document.getElementById("description");

    z = document.getElementById('bordered-radio-1')
    z.addEventListener("click", () => {
        x.classList.add("hidden")
        console.log("hidden");
    });

    y = document.getElementById('bordered-radio-2')
    y.addEventListener("click", () => {
        x.classList.remove("hidden")
        console.log("visible");
    });
    // if (checked) {
    //     const x = document.getElementById("description");
    //     //x.classList.add("hidden")
    //     x.style.visibility = "hidden";
    //     console.log("hidden");

    // }
    // else if (document.getElementById('bordered-radio-2').checked) {
    //     const x = document.getElementById("description");
    //     //x.classList.add("visible")
    //     x.style.visibility = "visible";
    //     console.log("visible");
    // }
}
process_response()