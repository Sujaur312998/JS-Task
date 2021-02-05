//UI interface
let form = document.querySelector('#task_form')
let newInputTask= document.querySelector('#new_task')
let filterTask= document.querySelector('#task_filter')
let taskList= document.querySelector('ul')
let clearTask= document.querySelector('#clear_task_btn')

//add Event Listener
form.addEventListener('submit',addNewTask)
taskList.addEventListener('click',removeItem)
clearTask.addEventListener('click',claearAllTask)
filterTask.addEventListener('keyup',filterAllTask)
document.addEventListener('DOMContentLoaded',getTask)
//Define Function
//addNewTask
function addNewTask(e){
    if(newInputTask.value=== ''){
        alert('Add a task!!!')
    }else{

        let li= document.createElement('li')
        li.appendChild(document.createTextNode(newInputTask.value +" "))
        taskList.appendChild(li)
        
        let link= document.createElement('a')
        link.setAttribute('href','#')
        link.innerHTML='x'
        li.appendChild(link)

        storeTaskInLocalStorage(newInputTask.value)

        newInputTask.value=''
    }
    e.preventDefault()
}

//removeItem
function removeItem(e){
    
    if (e.target.hasAttribute('href')){
        if (confirm('Are you sure?')){
            let ele= e.target.parentElement
            ele.remove()
            //console.log(ele);
            removeFromLS(ele)
        }
        // console.log(e.target);
    }
}
function claearAllTask(e){
    //taskList.innerHTML=''
    while( taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    localStorage.clear()
}

//filterTask

function filterAllTask(e){

    let text= e.target.value.toLowerCase()
    //console.log(text);

    document.querySelectorAll('li').forEach(task=>{
        let item= task.firstChild.textContent.toLowerCase()

        if(item.indexOf(text)!=-1){
            task.style.display='block'
        }else{
            task.style.display='none'
        }
    })
    // let text= e.target.value.toLowerCase()
    // console.log(text);

    // let ab=document.querySelectorAll('li').forEach(task=>{
    //     let item= task.firstChild.textContent
    //     console.log(item.toLowerCase().indexOf(text))
    //     if(item.toLowerCase().indexOf(text)!= -1){
    //         task.style.display='block'
    //     }else{
    //         task.style.display='none'
    //     } 
    // })   
}

//storeTaskInLocalStorage

function storeTaskInLocalStorage(value) {
    let tasks
    if (localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(value)

    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function getTask(){
    let tasks
    if (localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.forEach(task=>{
        
        let li= document.createElement('li')
        li.appendChild(document.createTextNode(task +" "))
        taskList.appendChild(li)
        
        let link= document.createElement('a')
        link.setAttribute('href','#')
        link.innerHTML='x'
        li.appendChild(link)

    })
}

//   removeFromLS
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>'

    tasks.forEach((task, index) =>{
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

