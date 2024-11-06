
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


    const submit = document.getElementById('submit_form')
    submit.addEventListener("click", () => {
        console.log("send to firebase!");
        getInfoNewProfile()
        
    });
}
process_response()


function getInfoNewProfile() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {

            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            const lat = document.getElementById("latitude").value;
            const long = document.getElementById("longitude").value;
            const profile_username = document.getElementById("profile_username").value;
            

            db.collection("users").doc(user.uid).set({         

                latitude: lat,
                longitude: long,
                username: profile_username,                         
                               
                            
            }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("../Pages/home.html");       //re-direct to main.html after signup
                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
    
}
//getInfoNewProfile()