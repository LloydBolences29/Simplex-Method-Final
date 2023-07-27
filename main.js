window.onload = () => { console.log("document is ready") }

var cjColumn = [0, 0];
var constraintS1 = [];
var constraintS2 = [];
var objFunc = [];
var constraintValue = ['A', 'B', 'S1', 'S2',];
var solutionMix = ['S1', 'S2']
var productionMix = ['A', 'B']
var ZjVal = []
var cjZjVal = []
var isOPtimized = true
var AVal = document.getElementById('AVal')
var BVal = document.getElementById('BVal')
var S1Val = document.getElementById('S1Val')
var S2Val = document.getElementById('S2Val')
var first = document.getElementById('dataSection')
var second = document.getElementById('2nddataSection')
var myTable = document.getElementById("myTable")
var S1 = document.getElementById('S1')
var S2 = document.getElementById('S2')
var cj1 = document.getElementById('cj1')
var cj2 = document.getElementById('cj2')
var tableContainer = document.getElementById('tableContainer')





//functions

//initializing the S1 and S2 values
var addRow = (arr, dataSection) => {

    for (let i = 0; i < arr.length; i++) {
        var newCell = document.createElement('td')
        newCell.textContent = arr[i]
        dataSection.appendChild(newCell)

    }

}

//creating Zj and its Values
var createZJ = () => {
    var newRow = document.createElement('tr')
    newRow.id = 'ZjVal';
    var blankCell = document.createElement('td')
    blankCell.textContent = "-"
    var newCell = document.createElement('td')
    newCell.textContent = "Zj"
    newRow.appendChild(blankCell);
    newRow.appendChild(newCell)
    myTable.appendChild(newRow)

    //computation for ZJ Values

    var tempArr1 = []
    var tempArr2 = []

    for (let i = 0; i < constraintS1.length; i++) {
        tempArr1[i] = cjColumn[0] * constraintS1[i]
        tempArr2[i] = cjColumn[1] * constraintS2[i]

        ZjVal[i] = tempArr1[i] + tempArr2[i]
    }

    for (let i = 0; i < ZjVal.length; i++) {
        var zjCell = document.createElement('td')
        zjCell.textContent = ZjVal[i]
        newRow.appendChild(zjCell)
        myTable.appendChild(newRow)
    }
}

//checking
var checkIfOptimized = () => {
    return cjZjVal.every((e) => {
        e <= 0 ? isOPtimized = true : isOPtimized = false

    })
}

//Function for getting optimized
var getOptimization = () => {

    //getting the pivotal column
    let highestNum;

    for (let i = 0; i < cjZjVal.length; i++) {
        highestNum = cjZjVal[0]
        if (cjZjVal[i] > highestNum) {
            highestNum = cjZjVal[i]

        }
    }
    var pivotIndex = cjZjVal.indexOf(highestNum)


    //getting the pivotal row 
    var qty1 = constraintS1[4]
    var qty2 = constraintS2[4]

    var val1 = qty1 / constraintS1[pivotIndex]
    var val2 = qty2 / constraintS2[pivotIndex]

    //changing the value in cj column and production mix and setting up the value of the pivot /Step 9 
    var pivotRow
    var pivot

    if (val1 < val2) {
        pivotRow = constraintS1
        // S1.textContent = productionMix[pivotIndex]
        // cj1.textContent = objFunc[pivotIndex]
        pivot = pivotRow[pivotIndex]
        

    } else {
        pivotRow = constraintS2
        // S2.textContent = productionMix[pivotIndex]
        // cj2.textContent = objFunc[pivotIndex]
        pivot = pivotRow[pivotIndex]
    }
    console.log(pivotIndex)
    cjColumn[pivotIndex] = objFunc[0]
    console.log(cjColumn)

    
    //Step 10 Divide all the entries in the pivot row by the pivot
    for (let i = 0; i < pivotRow.length; i++) {
        pivotRow[i] = pivotRow[i] / pivot
    }
    console.log(constraintS1)
    console.log(constraintS2)

    //create the second table and its headings

    var secondTable = document.createElement('table')
    secondTable.classList.add('table')
    secondTable.setAttribute('id', 'secondtable')
    var newTb = document.createElement('tbody')
    var newTr = document.createElement('tr')
    var cjTh = document.createElement('th')
    var cjThSpan = document.createElement('span')
    cjThSpan.textContent = 'CJ'
    cjTh.appendChild(cjThSpan)
    newTr.appendChild(cjTh)
    var solutionMixTh = document.createElement('th')
    var solutionMixThSpan = document.createElement('span')
    solutionMixThSpan.textContent = "Solution Mix"
    solutionMixTh.appendChild(solutionMixThSpan)
    newTr.appendChild(solutionMixTh)


    for (let i = 0; i < objFunc.length; i++) {
        var objTh = document.createElement('th')
        var divTh = document.createElement('div')
        divTh.classList.add('row')
        var thSpan = document.createElement('span')
        thSpan.setAttribute('id', `${constraintValue[i]}Val`)
        thSpan.textContent = objFunc[i]

        var div2Th = document.createElement('div')
        div2Th.classList.add('row')
        var prodThSpan = document.createElement('span')
        prodThSpan.textContent = constraintValue[i]

        divTh.appendChild(thSpan)
        div2Th.appendChild(prodThSpan)
        objTh.appendChild(divTh)
        objTh.appendChild(div2Th)
        newTr.appendChild(objTh)

    }

    var qtyTh =document.createElement('th')
    var qtySpan = document.createElement('Span')
    qtySpan.textContent="Quantity"
    qtyTh.appendChild(qtySpan)
    newTr.appendChild(qtyTh)
    newTb.appendChild(newTr)
    secondTable.appendChild(newTb)
    tableContainer.appendChild(secondTable)

    //create data section
    var secondDataSectTr = document.createElement('tr')
    secondDataSectTr.setAttribute('id', 'firstdataSect2ndTable')
    var tdobj = document.createElement('td')
    var tdSlack = document.createElement('td')
    tdobj.textContent = cjColumn[pivotIndex]
    tdSlack.textContent = productionMix[pivotIndex]

    secondDataSectTr.appendChild(tdobj)
    secondDataSectTr.appendChild(tdSlack)
    addRow(constraintS1, secondDataSectTr)
    newTb.appendChild(secondDataSectTr)











}

//creating event for the button
var saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", (e) => {

    //Initialization
    //profits
    var objA = parseInt(document.getElementById("objA").value);
    var objB = parseInt(document.getElementById("objB").value);

    //Constraints
    var S1A = parseInt(document.getElementById("A1").value);
    var S1B = parseInt(document.getElementById("B1").value);
    var quantity1 = parseInt(document.getElementById("quantity1").value);
    var S2A = parseInt(document.getElementById("A2").value);
    var S2B = parseInt(document.getElementById("B2").value);
    var quantity2 = parseInt(document.getElementById("quantity2").value);




    //hide the modal after clicking the button
    $('#exampleModal').modal('hide');

    //assigning
    objFunc = [objA, objB, 0, 0]
    console.log(objFunc)
    constraintS1 = [S1A, S1B, 1, 0, quantity1]
    console.log(constraintS1)
    constraintS2 = [S2A, S2B, 0, 1, quantity2]
    console.log(constraintS2)
    AVal.textContent = objFunc[0]
    BVal.textContent = objFunc[1]

    //flashing to the document the values
    addRow(constraintS1, first)
    console.log(constraintS1)
    addRow(constraintS2, second)
    console.log(constraintS2)
    cj1.textContent = cjColumn[0]
    S1.textContent = solutionMix[0]
    cj2.textContent = cjColumn[1]
    S2.textContent = solutionMix[1]
    //adding Zj value
    createZJ()

    //creating the  Cj-ZJ values
    var cjMinZjVal = () => {
        var newRow = document.createElement("tr")
        newRow.id = 'CjZJRow'
        var blankCell = document.createElement('td')
        blankCell.textContent = "-"
        var newCell = document.createElement('td')
        newCell.textContent = 'Cj - Zj'
        newRow.appendChild(blankCell)
        newRow.appendChild(newCell)
        myTable.appendChild(newRow)



        //computing for the values of the CJ - Zj 
        for (let i = 0; i < objFunc.length; i++) {
            cjZjVal[i] = objFunc[i] - ZjVal[i]
            var cjZjCell = document.createElement('td')
            cjZjCell.textContent = cjZjVal[i]
            newRow.appendChild(cjZjCell)
            myTable.appendChild(newRow)

        }
        console.log(cjZjVal)
    }

    cjMinZjVal()
    checkIfOptimized()
    console.log(isOPtimized)
    getOptimization()

    console.log(objFunc)








})