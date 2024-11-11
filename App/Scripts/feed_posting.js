// we will need to overwrite the posting placeholder info here, and make sure each one links to a dif page with it

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("postingTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allPostings => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allPostings.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key

                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                var docID = doc.id;

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;

                newcard.querySelector('.card-text').innerHTML = details;

                newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

                //Example: NV01.jpg

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}
// DO NOT RUN I REPEAT DO NOT RUN