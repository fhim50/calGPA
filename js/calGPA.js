//event listeners
var removeSubject=document.getElementById('removeSubject-0');
var addSubject = document.getElementById('addSubject-0');
var gpa = document.getElementById('GPA');
var addSection = document.getElementsByClassName('section');
removeSubject.addEventListener('click',rmSub,false); 
addSubject.addEventListener('click',addSub,false);
gpa.addEventListener('click',testApp,false);

//end evwnt listener

//global var
var calColumn = document.getElementsByClassName('calColumn');
var lengthCalColumn = calColumn.length
calColumn = calColumn[lengthCalColumn-1]
var formRow = document.getElementById('formRow');

function addSub() {
    var htmlContent = formRow.innerHTML;
    //var currentLength = document.getElementsByClassName('formRow');
    var formRowLength = calColumn.getElementsByClassName('formRow').length;// get all formRow  in the last calColumn
    var newformRow = document.createElement('div');newformRow.setAttribute('class','formRow');newformRow.setAttribute('id','formRow'+formRowLength);
    newformRow.innerHTML = htmlContent;
    calColumn.appendChild(newformRow);
}
function rmSub() {
    var formRow = calColumn.getElementsByClassName('formRow');
    var lastFormRow = formRow.length;
    if (lastFormRow > 1) {
        calColumn.removeChild(formRow[lastFormRow-1]);
    }
    else{
        alert("You cannot remove this row")
    }
}
function getData(){
    var dataObject = new Array();
    var allCalColumn = document.getElementsByClassName('calColumn');
    for (var i = 0; i < allCalColumn.length ; i++) {
        var formRow = allCalColumn[i].getElementsByClassName('formRow');
        var allFormRow = new Array();
        for (var j = 0; j <formRow.length; j++) {
            var currentformRow = formRow[j];
            allFormRow.push(parseInt(formRow[j].getElementsByClassName('credit')[0].value));
            allFormRow.push(parseInt(formRow[j].getElementsByClassName('grade')[0].value));
        }
        dataObject.push(allFormRow)
    }
    return dataObject;
}
function arrangeData(list) {
    var credit = new Array();
    var grade = new Array();
    var totalCredit = 0;
    for (var i = 0; i < list.length; i++) {
        if (i%2===0) {
            credit.push(list[i]);
            totalCredit = totalCredit + list[i];
        }
        else{
            grade.push(list[i]);
        }
    }
    return [credit,grade,totalCredit];
}
function calGPA() {
    var allTotal = new Array();
    var data = getData();
    for (var i = 0; i < data.length;i++) {
        var result = 0;
        var gpaData = arrangeData(data[i]);
        var credit =  gpaData[0];
        var grade = gpaData[1];
        var totalCreditHours = gpaData[2];
        for (var  j=0; j < credit.length; j++) {
            result = result + ((credit[j]*grade[j])/totalCreditHours);
        }
        allTotal.push(result);
    }
    console.log(allTotal);
   return allTotal; 
}
function testApp() {
    var displayArea = document.getElementById('mainResult');
    var results = calGPA()[0];
    displayArea.innerText = results;
    displayArea.style.visibility = 'visible';
}
function makeNewSection() {
    //adds a new section or new formset for calculating the gpa in that period
    var mainColumn = document.getElementById('mainColumn');
    var newSection = document.createElement('div');
    var newCalColumn = document.createElement('div');
    var newNav = document.createElement('div');
    var newRemoveSubject = document.createElement('div');
    var newAddSubject = document.createElement('div');
    var allSection = document.getElementsByClassName('section');//get all class with name section for duplecation
    var lastSection = allSection[allSection.length-1];
    var lastSectionContent = lastSection.innerHTML;
    var currentSectionId = lastSection.id;var newSectionNumber = parseInt(currentSectionId.split('-')[1])+1;
    var newSectionId = 'section-'+newSectionNumber;
    var nav = allSection[0].getElementsByClassName('nav')[0];//get the first element with class nav
    var calColumn = allSection[0].getElementsByClassName('calColumn')[0]//get the first element with class calColume
    var navContent = nav.innerHTML;
    var calColumnContent = calColumn.innerHTML;
    console.log(calColumnContent);
    //section
    newSection.setAttribute('class','section');
    newSection.setAttribute('id',newSectionId);
    //nav
    newNav.setAttribute('class','nav');
    navContent = navContent.replace('removeSubject-0','removeSubject-'+newSectionNumber);
    navContent = navContent.replace('addSubject-0','addSubject-'+newSectionNumber);
    newNav.innerHTML = navContent;
    //calColumn
    newCalColumn.setAttribute('class','calColumn');
    newCalColumn.setAttribute('id','calColumn-'+newSectionNumber);
    newCalColumn.innerHTML = calColumnContent
    newSection.appendChild(newNav);
    newSection.appendChild(newCalColumn);
    mainColumn.appendChild(newSection);
    console.log(newSection);
}

makeNewSection();
//note
//work on the form duplication
// checkout calColum element.children