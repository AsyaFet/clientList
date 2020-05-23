let clients = [];
const database = firebase.database();
const clientsRef = firebase.database().ref("clients");
clientsRef.on("value", (snapshot) => {
  console.log(snapshot.val());
  clients = snapshot.val();
});
