function displayData(clientsList = clients) {
  const ul = document.querySelector("#clientsData");
  clients.forEach((client) => {
    const newLi = document.createElement("li");
    newLi.className = "media";
    const avatar = document.createElement("img");
    avatar.className = "mr-3 align-self-center";
    const div = document.createElement("div");
    div.className = "media-body";
    avatar.setAttribute("src", client.avatar);
    const text = document.createTextNode(
      `${client.lastName} ${client.firstName} - ${client.email}, ${client.gender} (${client.date} - ${client.amount})`
    );
    div.appendChild(text);
    newLi.appendChild(avatar);
    newLi.appendChild(div);
    ul.appendChild(newLi);
  });
}

function sortList(order) {
  const sortedClients = clients.sort((lastClient, nextClient) => {
    // return order == "ascending"
    //   ? lastClient.lastName > nextClient.lastName
    //     ? 1
    //     : -1
    //   : lastClient.lastName < nextClient.lastName
    //   ? 1
    //   : -1;

    if (order == "ascending") {
      return lastClient.lastName > nextClient.lastName ? 1 : -1;
    } else {
      return lastClient.lastName < nextClient.lastName ? 1 : -1;
    }
  });
  console.table(sortedClients);
  refreshData();
}

function refreshData(updatedClients) {
  clearList();
  displayData(updatedClients); // передаём сортированый массив
}

// Удаляет первый элемент списка, пока тот сущесвует
function clearList() {
  const ul = document.querySelector("#clientsData");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function filterList() {
  const filterString = document
    .querySelector("#filterInput")
    .value.toLowerCase()
    .trim();
  if (filterString) {
    const filteredClients = clients.filter((client) => {
      return (
        client.firstName.toLowerCase().includes(filterString) ||
        client.lastName.toLowerCase().includes(filterString)
      );
    });
    refreshData(filteredClients);
  } else {
    refreshData(clients);
  }
}
