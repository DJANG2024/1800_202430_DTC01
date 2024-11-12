function userSavePost() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it
    var user = firebase.auth().currentUser;

    if (user) {
        let y = db.collection('users').doc(user.uid);
        let userSaved = y.collection('saved');
        userSaved.doc(ID).set({})
            .then(() => {
                console.log("added the favourite!");
                x = document.getElementById("saved")
                x.classList.add("text-red-300")
            })


    } else {
        console.log("user is not logged in");
    }
}
//fix soon -ethan
var currentUser;
async function displaySavedIcon() {

    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it
    var user = firebase.auth().currentUser;

    if (user) {
        // Reference to the document in the profiles collection
        let savedRef = db.collection('users').doc(user.uid).collection("saved");

        // Fetch the document 
        const userDoc = await savedRef.get();

        if (userDoc.exists) {
            console.log("Post data:", doc.id);
            return true;
        } else {
            console.log("No such post!");
            return false;
        }

    }

}