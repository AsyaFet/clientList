function displayData(clientsList = clients) {
  const ul = document.querySelector("#clientsData");
  clientsList.forEach((client) => {
    const newLi = document.createElement("li");
    newLi.className = "media";
    const avatar = document.createElement("img");
    avatar.className = "mr-3 align-self-center";
    const div = document.createElement("div");
    div.className = "media-body";
    avatar.setAttribute("src", client.avatar);
    const mailLink = document.createElement("a");
    // mailLink.setAttribute("href", `mailto:${client.email}`);
    const textPart1 = document.createTextNode(
      `${client.lastName} ${client.firstName} - `
    );
    mailLink.setAttribute("href", `mailto:${client.email}`);
    mailLink.innerHTML = client.email;
    const textPart2 = document.createTextNode(
      ` ${client.gender} (${client.date} - ${client.amount})`
    );
    div.appendChild(textPart1);
    div.appendChild(mailLink);
    div.appendChild(textPart2);
    newLi.appendChild(avatar);
    newLi.appendChild(div);
    ul.appendChild(newLi);
  });
  sumAmount(clientsList);
}

function sortList(order) {
  const sortedClients = clients.sort((lastClient, nextClient) => {
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
    .trim(); //убирает пробелы в строке
  if (filterString) {
    const filteredClients = clients.filter((client) => {
      return (
        client.firstName.toLowerCase().includes(filterString) ||
        client.lastName.toLowerCase().includes(filterString) ||
        client.email.toLowerCase().includes(filterString) ||
        client.gender.toLowerCase().includes(filterString)
      );
    });
    refreshData(filteredClients);
    if (filteredClients.lenght === 0) {
      showGeneralResult();
    }
    // filteredClients.lenght === 0
    //   ? showNotFoundSection()
    //   : showResultListSection();
  } else {
    refreshData(clients);
    showResultListSection();
  }
}

function sumAmount(clientsList = clients) {
  const total = clientsList.reduce((amount, client) => {
    return amount + removeCurrencyFromAmount(client.amount); //передаём в функцию
  }, 0);
  document.querySelectorAll(".totalAmountContainer").forEach((element) => {
    element.innerHTML = total.toFixed(2);
  });
}

function removeCurrencyFromAmount(amount) {
  return Number(amount.slice(1));
}

// function showNotFoundSection() {
//   document.querySelector(".resultList").style.display = "none";
//   document.querySelector(".notFound").style.display = "block";
// }

// function showResultListSection() {
//   document.querySelector(".resultList").style.display = "block";
//   document.querySelector(".notFound").style.display = "none";
// }

function showGeneralResult() {
  if (filteredClients.lenght === 0) {
    document.querySelector(".resultList").style.display = "none";
    document.querySelector(".notFound").style.display = "block";
  } else {
    document.querySelector(".resultList").style.display = "block";
    document.querySelector(".notFound").style.display = "none";
  }
}
