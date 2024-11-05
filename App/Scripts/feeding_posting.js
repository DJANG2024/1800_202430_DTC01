function displayheadings(info) {
  db.collection("users")
    .doc(info)
    .onSnapshot(
      (infoDoc) => {
        //arrow notation
        console.log("current document data: " + infoDoc.data()); //.data() returns data object
        document.getElementById("user-information").innerHTML =
          infoDoc.data().users; //using javascript to display the data on the right place
      },
      (error) => {
        console.log("Error calling onSnapshot", error);
      }
    );
}
readQuote("users[0]");

const elem = document.getElementById("name-goes-here");
