// ************************************** START HEADER **************************************
let flower = document.querySelectorAll(".flower");

function flowerAnimeFunc() {
  const flowerAnime = [
    { transform: "rotate(0deg) scale(1.25)" },
    { transform: "rotate(90deg) scale(1)" },
    { transform: "rotate(180deg) scale(1.25)" },
    { transform: "rotate(270deg) scale(1)" },
    { transform: "rotate(360deg) scale(1.25)" },
  ];

  const flowerTiming = {
    duration: 5000,
    iterations: Infinity,
  };

  flower.forEach((flower) => {
    flower.animate(flowerAnime, flowerTiming);
  });
}
flowerAnimeFunc();
// ************************************** END HEADER **************************************

// ************************************** START Main **************************************
// Todo Calendar
let _caledar = document.getElementById("todo-calendar");
let _dayWrite = "";
let _monthWrite = "";
let _hourWrite = "";
let _minuteWrite = "";

function _currentTime() {
  let _date = new Date();
  let _year = _date.getFullYear();
  let _month = _date.getMonth();
  let _day = _date.getDay();
  _hourWrite = _date.getHours();
  _minuteWrite = _date.getMinutes();

  switch (_day) {
    case 0:
      _dayWrite = "Sunday";
      break;
    case 1:
      _dayWrite = "Monday";
      break;
    case 2:
      _dayWrite = "Tuesday";
      break;
    case 3:
      _dayWrite = "Wednesday";
      break;
    case 4:
      _dayWrite = "Thursday";
      break;
    case 5:
      _dayWrite = "Friday";
      break;
    case 6:
      _dayWrite = "Saturday";
      break;
  }

  switch (_month) {
    case 0:
      _monthWrite = "January";
      break;
    case 1:
      _monthWrite = "February";
      break;
    case 2:
      _monthWrite = "March";
      break;
    case 3:
      _monthWrite = "April";
      break;
    case 4:
      _monthWrite = "May";
      break;
    case 5:
      _monthWrite = "June";
      break;
    case 6:
      _monthWrite = "July";
      break;
    case 7:
      _monthWrite = "August";
      break;
    case 8:
      _monthWrite = "September";
      break;
    case 9:
      _monthWrite = "October";
      break;
    case 10:
      _monthWrite = "November";
      break;
    case 11:
      _monthWrite = "December";
      break;
  }

  let _period = _hourWrite >= 12 ? "pm" : "am";
  let _formattedHour = _hourWrite % 12 || 12; // 24 -> 12
  let _formattedMinute = _minuteWrite.toString().padStart(2, "0"); // 05

  _caledar.innerText = `${_dayWrite} ${_monthWrite} ${_month} / ${_year} - ${_formattedHour} : ${_formattedMinute} ${_period}`;
}
_currentTime();
setInterval(_currentTime, 1000);
// Todo Calendar

// todo functions
let _todoInput = document.getElementById("todo-input");
let _todoInputBtn = document.getElementById("todo-input-button");
let _todoListBox = document.getElementById("todo-list-box");

// **************************************** SAVE IN LOCAL STORAGE ****************************************
let historyBoxAll = document.getElementById("history-box-all");
let historyBoxActive = document.getElementById("history-box-active");
let historyBoxCompleted = document.getElementById("history-box-completed");

const HISTORY_STORAGE_KEYS = {
  all: "todo-history-box-all",
  active: "todo-history-box-active",
  completed: "todo-history-box-completed",
};

let taskIdCounter = 0;

function createTaskId() {
  taskIdCounter += 1;
  return `task-${taskIdCounter}`;
}

function assignTaskIds(container) {
  Array.from(container.children).forEach((child) => {
    if (!child.dataset.taskId) {
      child.dataset.taskId = createTaskId();
    } else {
      const match = child.dataset.taskId.match(/(\d+)$/);
      if (match) {
        taskIdCounter = Math.max(taskIdCounter, Number(match[1]));
      }
    }
  });
}

function updateTaskHistory(todoItem) {
  const tempValue = todoItem.querySelector("#temp-value");
  if (!tempValue) return;

  const isCompleted = tempValue.classList.contains("line-through");
  const targetBox = isCompleted ? historyBoxCompleted : historyBoxActive;
  const sourceBoxes = [historyBoxActive, historyBoxCompleted];

  sourceBoxes.forEach((box) => {
    const existingClone = box.querySelector(
      `[data-task-id="${todoItem.dataset.taskId}"]`,
    );
    if (existingClone) {
      existingClone.remove();
    }
  });

  targetBox.appendChild(todoItem.cloneNode(true));
}

function saveHistoryBoxAll() {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEYS.all, historyBoxAll.innerHTML);
    localStorage.setItem(HISTORY_STORAGE_KEYS.active, historyBoxActive.innerHTML);
    localStorage.setItem(
      HISTORY_STORAGE_KEYS.completed,
      historyBoxCompleted.innerHTML,
    );
  } catch (error) {
    console.error("Could not save history:", error);
  }
}

function loadHistoryBoxAll() {
  try {
    const savedAllHistory = localStorage.getItem(HISTORY_STORAGE_KEYS.all);
    const savedActiveHistory = localStorage.getItem(HISTORY_STORAGE_KEYS.active);
    const savedCompletedHistory = localStorage.getItem(
      HISTORY_STORAGE_KEYS.completed,
    );

    if (savedAllHistory) {
      historyBoxAll.innerHTML = savedAllHistory;
    }
    if (savedActiveHistory) {
      historyBoxActive.innerHTML = savedActiveHistory;
    }
    if (savedCompletedHistory) {
      historyBoxCompleted.innerHTML = savedCompletedHistory;
    }

    assignTaskIds(historyBoxAll);
    assignTaskIds(historyBoxActive);
    assignTaskIds(historyBoxCompleted);
  } catch (error) {
    console.error("Could not load history:", error);
  }
}
loadHistoryBoxAll();
// **************************************** SAVE IN LOCAL STORAGE ****************************************

_todoInputBtn.addEventListener("click", (e) => {
  let temp = _todoInput.value;
  if (
    temp == "" ||
    temp == null ||
    temp == "\n" ||
    temp == " " ||
    temp.length < 3
  ) {
    alert("Please enter a task.");
    return;
  } else {
    let _currentTimeText = _caledar.innerText;

    let _todoItem = document.createElement("div");
    _todoItem.classList.add("w-full", "h-14", "border-b", "pl-2");
    _todoItem.dataset.taskId = createTaskId();
    _todoItem.innerHTML = `
      <div class="w-full h-7 text-[10px] pt-3 text-[#757588]">${_currentTimeText}</div>
      <div class="w-full h-7 flex items-center justify-between">
        <div id="temp-value" class="w-[80%] h-full flex items-center">${temp}</div>
        <div class="w-[20%] h-full flex items-center justify-between text-[#757588]">
          <span id="complete-btn" data-status="false" title="Completed" onClick="_complete(event)">
            <svg width="16" height="16" fill="currentColor" class="cursor-pointer hover:text-green-700" viewBox="0 0 16 16">
              <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
              <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
            </svg>
          </span>
          <span title="Delete" onClick="_del(event)">
            <svg width="16" height="16" fill="currentColor" class="cursor-pointer hover:text-red-700" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </span>
          <span title="Edit" onClick="_edit(event)">
            <svg width="16" height="16" fill="currentColor" class="cursor-pointer hover:text-yellow-600" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>
          </span>
        </div>
      </div>
    `;
    _todoListBox.appendChild(_todoItem);
    historyBoxAll.appendChild(_todoItem.cloneNode(true));
    historyBoxActive.appendChild(_todoItem.cloneNode(true));
    saveHistoryBoxAll();
    _todoInput.value = null;
    _todoInput.focus();
  }
});

function _complete(e) {
  const completeBtn = e.target.closest("#complete-btn");
  if (!completeBtn) return;

  const todoItem = completeBtn.closest("div").parentElement.parentElement;
  const _tempValue = todoItem.querySelector("#temp-value");
  if (!_tempValue) return;

  const nextCompletedState = !_tempValue.classList.contains("line-through");

  _tempValue.classList.toggle("line-through", nextCompletedState);
  _tempValue.classList.toggle("text-[#757588]", !nextCompletedState);
  _tempValue.classList.toggle("text-green-700", nextCompletedState);

  updateTaskHistory(todoItem);
  saveHistoryBoxAll();
}

function _del(e) {
  let _tempValue = e.target.closest("div").parentElement.parentElement;
  _tempValue.remove();
  saveHistoryBoxAll();
}

function _edit(e) {
  let _tempValue = e.target
    .closest("div")
    .parentElement.parentElement.querySelector("#temp-value");
  let _newValue = prompt("Edit your task:", _tempValue.innerText);
  if (_newValue !== null && _newValue !== "") {
    _tempValue.innerText = _newValue;
    saveHistoryBoxAll();
  }
}

_todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    _todoInputBtn.click();
  }
});
// todo functions

// ################ History ################

// Change section
let _historySection = document.querySelectorAll("#history-sections>div");

_historySection.forEach((section) => {
  section.addEventListener("click", () => {
    _historySection.forEach((item) => {
      item.style.backgroundColor = "";
    });
    section.style.backgroundColor = "#d1d5dc";

    if (section.id === "all") {
      historyBoxAll.style.display = "block";
      historyBoxActive.style.display = "none";
      historyBoxCompleted.style.display = "none";
    } else if (section.id === "active") {
      historyBoxActive.style.display = "block";
      historyBoxAll.style.display = "none";
      historyBoxCompleted.style.display = "none";
    } else if (section.id === "completed") {
      historyBoxCompleted.style.display = "block";
      historyBoxAll.style.display = "none";
      historyBoxActive.style.display = "none";
    }
  });
});
// Change section

// Search in history
let searchBox = document.getElementById("search-box");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let searchBoxWrite = document.getElementById("search-box-write");

function renderSearchResults(term) {
  const searchTerm = term.trim().toLowerCase();

  if (!searchTerm) {
    searchBoxWrite.innerHTML = "";
    searchBoxWrite.style.display = "none";
    return;
  }

  const results = Array.from(historyBoxAll.children).filter((item) => {
    const textElement = item.querySelector("#temp-value");
    return textElement?.textContent.toLowerCase().includes(searchTerm);
  });

  if (results.length === 0) {
    searchBoxWrite.innerHTML = `<div class="w-full p-3 text-sm text-center text-gray-700">No matching history items found.</div>`;
    searchBoxWrite.style.display = "block";
    return;
  }

  searchBoxWrite.innerHTML = "";
  results.forEach((item) => {
    searchBoxWrite.appendChild(item.cloneNode(true));
  });
  searchBoxWrite.style.display = "block";
}

searchButton.addEventListener("click", () => {
  renderSearchResults(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    searchBoxWrite.innerHTML = "";
    searchBoxWrite.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target)) {
    searchBoxWrite.innerHTML = "";
    searchBoxWrite.style.display = "none";
    searchInput.value = "";
  }
});
// Search in history

// ************************************** END Main **************************************
