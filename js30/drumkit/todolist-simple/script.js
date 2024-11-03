const form = document.querySelector("#add-item-form");
const input = document.querySelector("#add-item-input");
const list = document.querySelector("#items-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newItem = input.value;
  const listItem = document.createElement("li");
  listItem.textContent = newItem;
  listItem.classList.add("item");
  list.appendChild(listItem);
  input.value = "";
});

list.addEventListener("click", (event) => {
  list.removeChild(event.target);
});
