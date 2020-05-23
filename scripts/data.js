let clients = [];
const database = firebase.database();
const clientsRef = firebase.database().ref("clients");
clientsRef.on("value", (snapshot) => {
  clients = Array.from(Object.values(snapshot.val()));
  displayData(clients);
});
