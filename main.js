
let buttonAdd = document.createElement('button')
buttonAdd.textContent = 'Add'
buttonAdd.id = 'buttonAdd'
document.getElementById('headerToDo').append(buttonAdd)

let tasks = []

let number = 0
buttonAdd.addEventListener('click', () => {
    let input = document.getElementById('input')
    if (input.value === '') {
        alert('Вы должны что-то ввести!')
        return
    }

    let taskObj = {}
    taskObj['name']= input.value
    taskObj['nameEdit'] = ''
    taskObj['id'] = number
    taskObj['check'] = false
    taskObj['style'] = 'none'
    taskObj['styleOk'] = 'hidden'

    tasks.push(taskObj)

    input.value = ''

    view()
    validation()

    let buttonDone = document.getElementById('done')
    buttonDone.addEventListener('click', (e) => {
        for (let i = 0; i < tasks.length; i++){
            if(tasks[i].check === true){
                tasks[i].style = 'line-through'
            }
        }
        view()
    })

    let buttonDelete = document.getElementById('delete')
    buttonDelete.addEventListener('click', (e) => {
        for (let i = 0; i < tasks.length; i++){
            if(tasks[i].check === true){
                tasks.splice(i,1)
            }
        }
        view()
        validation()
    })

    let buttonSelectAll = document.getElementById('SelectAll')
    buttonSelectAll.addEventListener('click', (e) =>{
        for (let i = 0; i < tasks.length; i++){
            tasks[i].check = true
        }
        view()
        validation()
    })

    let buttonCleanAll = document.getElementById('clean')
    buttonCleanAll.addEventListener('click', (e) =>{
        for (let i = 0; i < tasks.length; i++){
            tasks[i].check = false
        }
        view()
        validation()
    })
    number++
})

function view (){
    document.getElementById('bodyToDo').innerHTML = ''


    for(let i = 0; i < tasks.length; i++){
        let task = document.createElement("div")
        task.className = 'task'
        task.id = tasks[i].id
        document.getElementById('bodyToDo').append(task)

        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = tasks[i].check
        checkbox.className = 'checkbox'
        document.getElementById(tasks[i].id).append(checkbox)

        let textEdit
        if(tasks[i].nameEdit !== 'edit' ){
            let text = document.createElement('div')
            text.textContent = tasks[i].name
            text.style.textDecoration = tasks[i].style
            text.className = 'textToDo'
            document.getElementById(tasks[i].id).append(text)
        }  else {
            textEdit = document.createElement('input')
            textEdit.value = tasks[i].name
            textEdit.className = 'bEdit'
            document.getElementById(tasks[i].id).append(textEdit)
        }

        let buttonOk = document.createElement('button')
        buttonOk.textContent = 'OK'
        buttonOk.className = 'okay'
        buttonOk.style.visibility = tasks[i].styleOk
        document.getElementById(tasks[i].id).append(buttonOk)

        buttonOk.addEventListener('click', ()=>{
            tasks[i].name = textEdit.value
            tasks[i].nameEdit = ''
            tasks[i].styleOk = 'hidden'
            view()
        })

        let buttonEdit = document.createElement('button')
        buttonEdit.innerHTML = '&#9998;'
        buttonEdit.className = 'edit'
        document.getElementById(tasks[i].id).append(buttonEdit)

        buttonEdit.addEventListener('click', ()=>{
            tasks[i].styleOk = 'visible'
            tasks[i].nameEdit = 'edit'

            view()
        })

        task.addEventListener('mouseover', (e) => {
            buttonEdit.style.visibility = 'visible'
        })
        task.addEventListener('mouseout', (e) => {
            buttonEdit.style.visibility = 'hidden'
        })

        let buttonClose = document.createElement('button')
        buttonClose.textContent = 'X'
        buttonClose.className = 'buttonText'
        document.getElementById(tasks[i].id).append(buttonClose)
    }



    let deleteTask = document.querySelectorAll('.buttonText')
    for (let i = 0; i < deleteTask.length; i++){
        deleteTask[i].addEventListener('click', (event) => {
            let deleteId = Number(event.currentTarget.parentElement.id)
            for(let i = 0 ; i < tasks.length; i++){
                if(tasks[i].id === deleteId){
                    tasks.splice(i,1)
                }
            }
            view()
            validation()
        })
    }

    let checkbox = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('change', (event) => {
            console.log(event.currentTarget.checked)
            let deleteId = Number(event.currentTarget.parentElement.id)
            for(let i = 0 ; i < tasks.length; i++){
                if(tasks[i].id === deleteId){
                    tasks[i].check = event.currentTarget.checked
                }
                console.log(tasks)
            }
            view()
            validation()
        })
    }
    let textTask = document.getElementsByClassName('textToDo')
    for (let i = 0; i < textTask.length; i++){
        textTask[i].addEventListener('click', (e) => {
            let id = Number(e.currentTarget.parentElement.id)
            for (let i = 0; i < tasks.length; i++){
                if(tasks[i].id === id){
                    if(tasks[i].style === 'none'){
                        tasks[i].style = 'line-through'
                    } else {
                        tasks[i].style = 'none'
                    }
                }
            }
            view()
        })
    }

}

function validation () {

    let bDone = document.getElementById('done')
    let bDelete = document.getElementById('delete')
    let bSelectAll = document.getElementById('SelectAll')
    let bCleanAll =document.getElementById('clean')
    let textAll = document.querySelector('.textToDo')

    let checkboxChecked = []
    for (let i = 0; i < tasks.length; i++) {
        checkboxChecked.push(tasks[i].check === true)
    }
    let validate = obj => obj.every(x => x === false)
    if (validate(checkboxChecked) === true) {
        bDone.style.visibility = 'hidden'
        bDelete.style.visibility = 'hidden'
    } else {
        bDone.style.visibility = 'visible'
        bDelete.style.visibility = 'visible'
    }
    if (textAll === null){
        bSelectAll.style.visibility = 'hidden'
        bCleanAll.style.visibility = 'hidden'
    } else {
        bSelectAll.style.visibility = 'visible'
        bCleanAll.style.visibility = 'visible'
    }
}

