 
		var selectedToDo;
		
		
		window.onload = function() {
			console.log("Wiem ze strona zaladowala sie");
			console.log("selectedToDo: " + selectedToDo);
						
		
			document.getElementById("todolist").onclick = loadToDo;
			document.getElementById("newbtn").onclick = newToDo;
			document.getElementById("savebtn").onclick = saveToDo;
			document.getElementById("cancelbtn").onclick = closeEditor;
			document.getElementById("deletebtn").onclick = deleteToDo;
			document.getElementById("clearbtn").onclick = removeTasksLonger;
			document.getElementById("filterbtn").onclick = filterTasks;
			
			// wklejamy listę elementów, jeżeli jest zapamiętana w localStorage
			if (window.localStorage.getItem("todos") != null) {
				document.getElementById("todolist").innerHTML = window.localStorage.getItem("todos");
				console.log("Załadowałem jakieś zadania z localStorage");
			}
 		}
		
		
		
		// ustawienie edytora w odpowiednim trybie
		// new - niewidoczny przycisk Delete
		// edit - modyfikując treść zadania przycisk Delete niewidoczny
		function changeEditorMode(mode) {
			var editor = document.getElementById("editor");
			var textArea = document.getElementById("item");
			
			if (mode == "new") {
				editor.className = "new";
				textArea.value = "";
			}
			
			if (mode == "edit") {
				editor.className = "edit";
			}
			
			textArea.focus();									
		}
		
		
		
		// schowanie edytora gdy już nie jest potrzebny
		function closeEditor() {
			selectedToDo = undefined;							
			
			var editor = document.getElementById("editor");
			editor.style.visibility = "hidden";					
			
			changeEditorMode("new");							
			
			document.getElementById("newbtn").focus();		
			
			document.getElementById("finishedBox").checked = "";	
			
		}
		
		
		
		// podpięcie funkcji do przycisku "New"
		function newToDo() {
			selectedToDo = undefined;
			
			document.getElementById("editor").style.visibility = "visible";		
			changeEditorMode("new");			
			
			document.getElementById("finishedBox").checked = "";		
		}
		
		
		// sprawdzamy, który element listy jest kliknięty, żeby pobrać jego treść
		function loadToDo(event) {
			console.log("kliknieto w liste");
			console.log("event.target: " + event.target.tagName);
			console.log("event.target.value: " + event.target.innerHTML);
			
			document.getElementById("editor").style.visibility = "visible";		
			
			changeEditorMode("edit");											
			
			document.getElementById("item").value = event.target.innerHTML;
			
			
			selectedToDo = event.target;
			
			if (selectedToDo.dataset.status == "finished") {
				document.getElementById("finishedBox").checked = "checked";
			} else {
				document.getElementById("finishedBox").checked = "";
			}
		}
		
		
		function saveToDo() {
			var textArea = document.querySelector("#item");
			
			if (textArea.value.length == 0) {
				var alert = document.getElementById("editor");
                alert.className = "alert"; 
				return;	
			}
			
			if (selectedToDo == undefined) {
				var newTODO = document.createElement("li");
				newTODO.innerHTML = textArea.value;
				
				if (document.getElementById("finishedBox").checked) {
					newTODO.dataset.status = "finished";			
				} else {
					newTODO.dataset.status = "unfinished";			
				}
				
				var todos = document.getElementById("todolist");
				todos.appendChild(newTODO);
				
				changeEditorMode("new");
			} else {
				selectedToDo.innerHTML = textArea.value;
				
				if (document.getElementById("finishedBox").checked) {
					selectedToDo.dataset.status = "finished";			
				} else {
					selectedToDo.dataset.status = "unfinished";			
				}
				
				selectedToDo = undefined;					
				
				changeEditorMode("new");					
			}
			
			
			saveToLocalStorage();
		}
		
		
		
		// usunięcie zadania z listy
		function deleteToDo() {
			selectedToDo.remove();		
			
			saveToLocalStorage();		
		}
		
						
		// usunięcie wszystkich zadań z listy
		function removeTasksLonger() {
			if (selectedToDo != undefined) {
            }
			
			var taskList = document.getElementById("todolist");
			var tasks = taskList.getElementsByTagName("li");

			while(tasks.length > 0) {
				console.log(tasks[0].innerHTML);
				tasks[0].remove();
			}
			
			saveToLocalStorage();		
		}
		
		
		// zapamietanie aktualnej listy zadań w localStorage
		function saveToLocalStorage() {
			var taskList = document.getElementById("todolist");
			
			if (taskList.children.length == 0) {
				window.localStorage.removeItem("todos");
				console.log("Nie ma zadnych zadań do zapisania");
			} else {
				window.localStorage.setItem(
					"todos",
					taskList.innerHTML
				);
				
				console.log("Były jakieś zadania do zapisania");
			}
		}
		
		// filtrowani listy zadania zakończone/ niezakończone
		function filterTasks(event) {
			var taskList = document.getElementById("todolist");
			
			if (taskList.className == "all") {
				taskList.className = "finished";
				event.target.innerHTML = "Show all";
			} else {
				taskList.className = "all";
				event.target.innerHTML = "Show finished";
			}
		}