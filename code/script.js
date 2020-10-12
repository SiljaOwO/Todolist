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
    } 
    //If input is not empty, add user's input to the table
    else {
        if (table.rows.length == 0) {
            addRow();
        } 
        else if (table.rows[0].cells.item(1).innerHTML == "" && table.rows.length == 1) {
            table.deleteRow(0);
            addRow();
        } else {
            addRow();
        }
    }
}

function addRow() {
    var text = document.getElementById('textfield').value;
    var table = document.getElementById('table');

    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = '<input type="checkbox" id="check" onclick="isChecked(this);">';
    cell2.innerHTML = text;
    cell3.innerHTML = '<button id="delete" onclick="deleteRow(this);"><i class="fa fa-trash" aria-hidden="true"></i></button>';
}

function deleteRow(r) {
    var table = document.getElementById('table');
    var i = r.parentNode.parentNode.rowIndex;
    table.deleteRow(i);
}

function deleteAll() {
    var table = document.getElementById('table');

    if (table.rows.length > 0) {
        while (true) {
            table.deleteRow(0);
        }
    }
}

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

function selected() {
    var text = document.getElementById('textfield');
    text.select();
}