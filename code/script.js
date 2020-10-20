//Get date and show day and month
function thisDate() {
    var n = new Date();
    var d = n.getDate();
    var m = n.getMonth() + 1;

    var dateptag = document.getElementById('date');
    dateptag.innerHTML = "Date: " + d + "/" + m;
}

//Add user's input to the table
function addToList() {
    var text = document.getElementById('textfield').value;
    var table = document.getElementById('table');

    //Check if input is empty
    if (text == "") {
        alert("Please fill something!");
        document.getElementById('textfield').style.borderWidth = "thick";
    } 
    //If input is not empty, add user's input to the table
    else {
        //If table doesn't have any rows, it adds new row
        if (table.rows.length == 0) {
            addRow();
        }
        //If table has one row but it's empty, it deletes that row and then adds new
        else if (table.rows[0].cells.item(1).innerHTML == "" && table.rows.length == 1) {
            table.deleteRow(0);
            addRow();
        } else {
            addRow();
        }
    }
}

//Adds new row that includes checkbox, user's input and delete-button
function addRow() {
    var text = document.getElementById('textfield').value;
    var table = document.getElementById('table');

    document.getElementById('textfield').style.borderWidth = "2px";

    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = '<input type="checkbox" id="check" onclick="isChecked(this);">';
    cell2.innerHTML = text;
    cell3.innerHTML = '<button id="delete" onclick="deleteRow(this);"><i class="fa fa-trash" aria-hidden="true"></i></button>';

    //Add local storage
    var i = 0;
    while (true) {
        if (localStorage.getItem(i) == null) {
            localStorage.setItem(i, text);
            break;
        } else {
            i++;
        }
    }
}

//Deletes row
function deleteRow(r) {
    var table = document.getElementById('table');
    var i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);

    //Delete from local storage
    localStorage.removeItem(i);
    while (true) {
        if (localStorage.getItem(i+1) != null) {
            var x = localStorage.getItem(i+1);
            localStorage.setItem(i, x);
            localStorage.removeItem(i+1);
            i++;
        } else {
            break;
        }
    }
}

//Deletes everything
function deleteAll() {
    var table = document.getElementById('table');

    if (table.rows.length > 0) {
        while (true) {
            table.deleteRow(0);

            //Delete from local storage
            localStorage.clear();
        }
    }
}

//When checkbox is checked, text is lined through and when not, text has no decoration
function isChecked(c) {
    var table = document.getElementById('table');

    var i = c.parentNode.parentNode.rowIndex;
    var checkBox = document.getElementsByTagName('input')[i + 2];

    if (checkBox.checked == true) {
        table.rows[i].cells.item(1).style.textDecoration = "line-through";
    } else {
        table.rows[i].cells.item(1).style.textDecoration = "none";
    }
}

//When user clicks form, it selects all text
function selected() {
    var text = document.getElementById('textfield');
    text.select();
}


//Get data from local storage
function getData() {
    for (var i = 0; i < localStorage.length; i++) {
        var x = localStorage.getItem(i);
        addDataRow(x);
    }
    document.getElementById('table').deleteRow(0);
}

//Make table of data that is in local storage
function addDataRow(text) {
    var table = document.getElementById('table');

    document.getElementById('textfield').style.borderWidth = "2px";

    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = '<input type="checkbox" id="check" onclick="isChecked(this);">';
    cell2.innerHTML = text;
    cell3.innerHTML = '<button id="delete" onclick="deleteRow(this);"><i class="fa fa-trash" aria-hidden="true"></i></button>';
}
