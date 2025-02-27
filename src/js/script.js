document.getElementById("addTaskBtn").addEventListener("click", function(){
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if(taskText !== ""){
        let li = document.createElement("li");
        li.textContent = taskText;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "X"
        removeBtn.style.marginLeft = "10";
        removeBtn.style.color = "red";
        removeBtn.style.border = "none";
        removeBtn.style.cursor = "pointer";

        removeBtn.addEventListener("click", function(){
            li.remove();
        });

        li.appendChild(removeBtn)
        document.getElementById("taskList").appendChild(li);
        taskInput.value = "";
    }

});