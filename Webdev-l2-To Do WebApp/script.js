let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

document.getElementById("addBtn").addEventListener("click", addTask);

function addTask(){

let text = taskInput.value.trim();

if(text===""){
alert("Enter a task");
return;
}

tasks.push({
id:Date.now(),
text:text,
completed:false,
added:new Date().toLocaleString(),
completedTime:""
});

taskInput.value="";

save();
render();

}

function render(){

pendingList.innerHTML="";
completedList.innerHTML="";

let pending=0;
let completed=0;

tasks.forEach(task=>{

let li=document.createElement("li");

let content=`
<div class="task-text">${task.text}</div>

<div class="time">
Added : ${task.added}
${task.completed ? "<br>Completed : "+task.completedTime:""}
</div>
`;

li.innerHTML=content;

let buttons=document.createElement("div");
buttons.className="buttons";

let complete=document.createElement("button");
complete.className="complete";
complete.innerText=task.completed ? "Undo":"Complete";

complete.onclick=()=>{

task.completed=!task.completed;

if(task.completed){
task.completedTime=new Date().toLocaleString();
}else{
task.completedTime="";
}

save();
render();

};

let edit=document.createElement("button");
edit.className="edit";
edit.innerText="Edit";

edit.onclick=()=>{

let input=document.createElement("input");
input.value=task.text;
input.style.width="100%";

li.innerHTML="";
li.appendChild(input);

let saveBtn=document.createElement("button");
saveBtn.innerText="Save";
saveBtn.className="save";

saveBtn.onclick=()=>{

task.text=input.value.trim() || task.text;

save();
render();

};

li.appendChild(saveBtn);

};

let del=document.createElement("button");
del.className="delete";
del.innerText="Delete";

del.onclick=()=>{

tasks=tasks.filter(t=>t.id!==task.id);

save();
render();

};

buttons.appendChild(complete);
buttons.appendChild(edit);
buttons.appendChild(del);

li.appendChild(buttons);

if(task.completed){

completed++;
completedList.appendChild(li);

}else{

pending++;
pendingList.appendChild(li);

}

});

pendingCount.innerText=pending;
completedCount.innerText=completed;

pendingEmpty.style.display=pending===0?"block":"none";
completedEmpty.style.display=completed===0?"block":"none";

}

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

render();
