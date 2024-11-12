function displayPostInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);
    db.collection("posting").doc(ID)
        .get()
        .then(async(postDoc) =>{
            let title = postDoc.data().title;
            let header = postDoc.data().header;
            let details = postDoc.data().details;
            let profile = postDoc.data().profile;
            let user = await getUserName(profile);
            document.getElementById("title").innerHTML = title
            document.getElementById("header").innerHTML = header
            document.getElementById("details").innerHTML = details
            document.getElementById("username").innerHTML = user


        });
}
displayPostInfo();