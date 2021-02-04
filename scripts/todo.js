const nav = document.querySelector(".nav__folders-wrapper"),
    nav_plus = document.querySelector(".nav__plus-folders"),
    main = document.querySelector(".main__toDos"),
    newFolderWrapper = document.querySelector(".nav__folders-plus-container");
const toDoTitle = document.querySelector(".main__header-heading"),
    toDoUl = main.querySelector("ul");

const TODOS = "todos";
const toDoDefault = [
    {
        folder: "Today",
        tasks: ["Eat", "Sleep", "Code"],
    },
    {
        folder: "This week",
        tasks: ["to Do List", "English"],
    },
    {
        folder: "Bucket list",
        tasks: ["Grand Canyon", "LOL Master Rank"]
    },
    {
        folder: "Example list",
        tasks: ["water", "wash dishes"],
    }
];
let toDos = [];
function saveToDos() {
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}
function deleteToDo(event) {
    let targetFolderName = document.querySelector("h2").innerText;
    let target = event.target.parentNode;
    // 1. 화면에서 지움
    toDoUl.removeChild(target);
    // 2. toDos에서 지움
    // 2-1. 지울 task를 고름, toDos에서 해당 폴더를 고름
    let toDel = target.querySelector("div").innerText;
    let targetFolder = toDos.filter((obj) => obj.folder === targetFolderName)[0];
    // 2-2. 해당 폴더 -tasks에서 해당 일을 지움
    let folderIndex = toDos.indexOf(targetFolder);
    targetFolder.tasks.shift(toDel);
    // 2-3. 변경된 tasks를 가진 obj를 toDos에 업데이트
    toDos[folderIndex] = targetFolder;
    saveToDos();
}
function doneToDo(event) {
    let target = event.target.parentNode.querySelector(".toDo");
    target.classList.add("toDo-finished");
    let targetFolderName = toDoTitle.innerText;
    let targetFolder = toDos.filter((obj) => obj.folder === targetFolderName)[0];
    let folderIndex = toDos.indexOf(targetFolder);
    let targetIndex = targetFolder.tasks.indexOf(target.innerText);
    targetFolder.tasks[targetIndex] += "fin";
    toDos[folderIndex] = targetFolder;
    saveToDos();
}
function paintTask(task) {
    const toDoLi = document.createElement("li");
    let toDo = task;
    if (toDo.slice(-3) === "fin") {
        toDo = toDo.slice(0, -3);
    }
    toDoLi.className = "main__toDos-toDo";
    toDoLi.innerHTML = `<div class="toDo ${task.slice(-3) === "fin" ? "toDo-finished" : ""}">${toDo}</div>
        <button class="toDo-done">DONE</button>
        <button class="toDo-delete">DELETE</button>`;
    toDoLi.querySelector(".toDo-done").addEventListener("click", doneToDo);
    toDoLi.querySelector(".toDo-delete").addEventListener("click", deleteToDo);
    toDoUl.appendChild(toDoLi);
}
function paintToDos(whisky) {
    toDoUl.innerHTML = "";
    whisky.tasks.forEach((task) => paintTask(task));
    // folder에 해당하는 task들을 각각 paint실행
}
function addToDo(event) {
    event.preventDefault();
    let toDo = event.target.querySelector("input").value;
    if (toDo !== "") {
        paintTask(toDo);
        let folderName = toDoTitle.innerText;
        let targetFolder = toDos.filter((obj) => obj.folder === folderName)[0];
        let folderIndex = toDos.indexOf(targetFolder);
        targetFolder.tasks.push(toDo);
        toDos[folderIndex] = targetFolder;
        saveToDos();
    }
}
function openFolder(event) {
    let folder = event.target;
    if (event.target.tagName === "I"){
        folder = folder.parentNode;
    }
    let folderName = folder.innerText;
    toDoTitle.innerText = folderName;
    let toOpen = toDos.filter((obj) => obj.folder === folderName)[0];
    paintToDos(toOpen);
    // 클릭된 폴더이름을 가져와 toDos에서 해당 obj를 뽑아냄
}
function removeFolder(event) {
    let folderName = event.target.parentNode.innerText;
    // let toRemove = toDos.filter((obj) => obj.folder === folderName); 
    toDos = toDos.filter((obj) => obj.folder !== folderName);
    saveToDos();
    const divToRemove = event.target.parentNode;
    nav_plus.removeChild(divToRemove);
}
function paintFolder(whisky) {
    const plusContainer = document.createElement("div");
    plusContainer.className = "folder-wrapper";
    plusContainer.id = whisky;
    plusContainer.innerHTML = `<li class="nav__folders-folder">
        <i class="fas fa-archive"></i>${whisky}
        </li>
        <i class="fa fa-trash-alt"></i>`;
    plusContainer.querySelector("li").addEventListener("click", openFolder);
    plusContainer.querySelector(".fa-trash-alt").addEventListener("click", removeFolder);
    nav_plus.appendChild(plusContainer);
}
function addFolder(event) {
    event.preventDefault();
    let folderName = event.target.querySelector("input").value;
    toDoObj = {
        folder: folderName,
        tasks: [],
    }
    toDos.push(toDoObj);
    saveToDos();
    paintFolder(folderName);
}
function loadToDo() {
    let tasks = localStorage.getItem(TODOS);
    if (!tasks) {
        toDos = toDoDefault;
    } else {
        tasks = JSON.parse(tasks);
        toDos = tasks;
    }    
    saveToDos();
    let folders = [];
    toDos.forEach((obj) => folders.push(obj.folder));
    let plusFolders = folders.slice(3);
    const defContainer = nav.querySelector(".nav__default-folders");
    defContainer.innerHTML = `<li class="nav__folders-folder">
                        <i class="fas fa-calendar-day"></i>Today
                    </li>
                    <li class="nav__folders-folder">
                        <i class="fab fa-weebly"></i>This week
                    </li>
                    <li class="nav__folders-folder">
                        <i class="fab fa-bitbucket"></i>Bucket list
                    </li>`;
    defContainer.querySelectorAll("li").forEach((li) => li.addEventListener("click", openFolder));
    if (plusFolders !== []) {
        plusFolders.forEach(folder => paintFolder(folder));
    }
    const newFolderInput = newFolderWrapper.querySelector("form");
    newFolderInput.addEventListener("submit", addFolder);
    const toDoInput = main.querySelector("form");
    toDoInput.addEventListener("submit", addToDo);
}
function init() {
    loadToDo();
    toDoTitle.innerText = toDos[0].folder;
    paintToDos(toDos[0]);
}

init();