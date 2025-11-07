const addTask = document.getElementById("add-task");

const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");

addTask.addEventListener("click", function () {
  let i = 0;
  while (localStorage.getItem(`newTask${i}`) !== null) {
    ++i;
  }
  let taskKey = `newTask${i}`;
  let task = document.createElement("div");
  task.classList.add("task");
  
  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`;
  
  localStorage.setItem(taskKey, inputTask.value); //Here
  task.dataset.key = taskKey;
  task.appendChild(li);

  let checkButton = document.createElement("button");
  checkButton.innerHTML = `<i class="fa-solid fa-check">`;
  checkButton.classList.add("checkTask");
  task.appendChild(checkButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can">`;
  deleteButton.classList.add("deleteTask");
  task.appendChild(deleteButton);

  if (inputTask.value === "") {
    alert("Please Input A Task");
    localStorage.removeItem(taskKey);

  } else {
    taskContainer.appendChild(task);
  }
  inputTask.value = "";

  checkButton.addEventListener("click", function () {
    checkButton.parentElement.style.textDecoration = " line-through";
    checkButton.parentElement.style.color = "red";
  });
  deleteButton.addEventListener("click", function (e) {
    let target = e.target;
    localStorage.removeItem(taskKey);
    target.parentElement.parentElement.remove();
  });
});

function loadTasks() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("newTask")) {
      const taskValue = localStorage.getItem(key);
      let task = document.createElement("div");
      task.classList.add("task");

      let li = document.createElement("li");
      li.innerText = taskValue;
      task.appendChild(li);

      let checkButton = document.createElement("button");
      checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
      checkButton.classList.add("checkTask");
      task.appendChild(checkButton);

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      deleteButton.classList.add("deleteTask");
      task.appendChild(deleteButton);

      taskContainer.appendChild(task);

      checkButton.addEventListener("click", function () {
        task.style.textDecoration = "line-through";
        task.style.color = "red";
      });
      deleteButton.addEventListener("click", function () {
        localStorage.removeItem(key);
        task.remove();
      });
    }
  }
}
loadTasks();
