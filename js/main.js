let items = []; // The list of Items

/* Select the form, input and list */
const itemForm = document.querySelector('.item-form');
const itemInput = document.querySelector('.item-input');
const itemsList = document.querySelector('.items');


/** EVENTS LISTENERS **/


/* Listen all new items events */
itemForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addItem(itemInput.value);
});

/* Listen all delete button and checkbox clicks */
itemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        checkAndUncheckBox(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('edit-button')) {
        editItem(event.target.parentElement.getAttribute('data-key'), itemInput.value);
    }
    if (event.target.classList.contains('delete-button')) {
        deleteItem(event.target.parentElement.getAttribute('data-key'));
    }
});


/** ITEMS HANDLING **/


/* Add new item when trigger */
function addItem(itemName) {
    if (itemName !== '') { /* Check if item is empty, otherwise display an error */
        const item = {
            id: Date.now(),
            /* The id will help to manage the storage */
            name: itemName,
            completed: false
        };
        items.push(item);
        addToLocalStorage(items);

        itemInput.value = '';
    } else {
        alert("The name is empty! Please fill it in.");
    }

}


/* Edit an item */
function editItem(id, newItemName) {
    if (newItemName == '') {
        alert("The name is empty! Please fill it in before clicking on edit.");
        return
    }
    items.forEach(function(item) {
        if (item.id == id) {
            item.name = newItemName;
        }
    });

    addToLocalStorage(items); /* Update the list in localStorage */
}


/* Delete an item */
function deleteItem(id) {
    items = items.filter(function(item) {
        return item.id != id;
    });

    addToLocalStorage(items); /* Update the list in localStorage */
}


/* Update the checked box */
function checkAndUncheckBox(id) {
    items.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(items); /* Update the list in localStorage */
}


/** LOCALSTORAGE **/

/* Add the list in the storage */
function addToLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
    printItemsList(items);
}

/* Get the list from the storage */
function getFromLocalStorage() {
    const reference = localStorage.getItem('items');
    if (reference) {
        items = JSON.parse(reference);
        printItemsList(items);
    }
}

/** PRINTER **/

/* Print the updated list of items */
function printItemsList(items) {
    itemsList.innerHTML = '';

    items.forEach(function(item) {
        /* update the box and button for each item according to its saved values */
        const li = document.createElement('li');

        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${item.completed ? 'checked': null}>
      ${item.name}
      <button class="edit-button">Edit</button>
      <button class="delete-button">X</button>
    `;
        itemsList.append(li);
    });

}


getFromLocalStorage(); /* Get the list of items from localStorage after all events*/