window.onload = () => { console.log("document is ready") }

var otherRow
var pivotRow
var cjColumn = [0, 0];
var constraintS1 = [];
var constraintS2 = [];
var objFunc = [];
var constraintValue = ['A', 'B', 'S1', 'S2',];
var solutionMix = ['S1', 'S2']
var productionMix = ['A', 'B']
var ZjVal = []
var cjZjVal = []
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
var highestNum
var newTb
var newTr
var cjTh
var cjThSpan
var solutionMixTh
var solutionMixThSpan
var secondTable
var secondDataSection2ndTr



//functions
var cjMinZjVal = (table) => {
    var newRow = document.createElement("tr")
    newRow.id = 'CjZJRow'
    var blankCell = document.createElement('td')
    blankCell.textContent = "-"
    var newCell = document.createElement('td')
    newCell.textContent = 'Cj - Zj'
    newRow.appendChild(blankCell)
    newRow.appendChild(newCell)
    table.appendChild(newRow)



    //computing for the values of the CJ - Zj 
    for (let i = 0; i < objFunc.length; i++) {
        cjZjVal[i] = objFunc[i] - ZjVal[i]
        var cjZjCell = document.createElement('td')
        cjZjCell.textContent = cjZjVal[i]
        newRow.appendChild(cjZjCell)
        table.appendChild(newRow)

    }
    console.log(cjZjVal)
}

//initializing the S1 and S2 values
var addRow = (arr, dataSection) => {

    for (let i = 0; i < arr.length; i++) {
        var newCell = document.createElement('td')
        newCell.textContent = arr[i]
        dataSection.appendChild(newCell)

    }

}


//create the headings of the table
var createTableHeadings = () => {
    //create the second table and its headings

    secondTable = document.createElement('table')
    secondTable.classList.add('table')
    secondTable.setAttribute('id', 'secondtable')
    newTb = document.createElement('tbody')
    newTr = document.createElement('tr')
    cjTh = document.createElement('th')
    cjThSpan = document.createElement('span')
    cjThSpan.textContent = 'CJ'
    cjTh.appendChild(cjThSpan)
    newTr.appendChild(cjTh)
    solutionMixTh = document.createElement('th')
    solutionMixThSpan = document.createElement('span')
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

    var qtyTh = document.createElement('th')
    var qtySpan = document.createElement('Span')
    qtySpan.textContent = "Quantity"
    qtyTh.appendChild(qtySpan)
    newTr.appendChild(qtyTh)
    newTb.appendChild(newTr)
    secondTable.appendChild(newTb)
    tableContainer.appendChild(secondTable)

}


//creating Zj and its Values
var createZJ = (table) => {
    var newRow = document.createElement('tr')
    newRow.id = 'ZjVal';
    var blankCell = document.createElement('td')
    blankCell.textContent = "-"
    var newCell = document.createElement('td')
    newCell.textContent = "Zj"
    newRow.appendChild(blankCell);
    newRow.appendChild(newCell)
    table.appendChild(newRow)

    //computation for ZJ Values

    var tempArr1 = []
    var tempArr2 = []

    for (let i = 0; i < constraintS1.length; i++) {
        tempArr1[i] = cjColumn[0] * constraintS1[i]
        tempArr2[i] = cjColumn[1] * constraintS2[i]

        ZjVal[i] = tempArr1[i] + tempArr2[i]
        var zjCell = document.createElement('td')
        zjCell.textContent = ZjVal[i]
        newRow.appendChild(zjCell)
        table.appendChild(newRow)
    }


}

//checking
var checkIfOptimized = () => {
    isOPtimized = cjZjVal.every((e) => e <= 0)
    console.log(isOPtimized)
    if (isOPtimized==false) {
        getOptimization()
        console.log(isOPtimized)
        return
    } else {
        console.log("Optimized")
        isOPtimized = true
    }

}

//Function for getting optimized
var getOptimization = () => {

    //getting the pivotal column
    console.log(cjZjVal)

    //get the highest Number in the cjZjval array
    highestNum = Math.max(...cjZjVal);
    var pivotIndex = cjZjVal.indexOf(highestNum)
    console.log(pivotIndex)


    //getting the pivotal row 
    var qty1 = constraintS1[4]
    var qty2 = constraintS2[4]

    var val1 = qty1 / constraintS1[pivotIndex]
    console.log(qty1)
    var val2 = qty2 / constraintS2[pivotIndex]
    console.log(qty2)
    console.log(val2)

    //changing the value in cj column and production mix and setting up the value of the pivot /Step 9 
    var pivot
    var slackVal1 = solutionMix[0]
    var slackVal2 = solutionMix[1]
    var cjCol
    var othercjCol
    console.log(pivotIndex)


    if (val1 < val2) {
        pivotRow = constraintS1
        otherRow = constraintS2
        cjColumn[pivotIndex] = highestNum
        solutionMix[0] = productionMix[0]
        pivot = constraintS1[pivotIndex]
        cjCol = cjColumn[0]
        othercjCol = cjColumn[1]
        slackVal1 = productionMix[pivotIndex]
        cjColumn[pivotIndex] = objFunc[pivotIndex]
        var negateNum = -constraintS2[pivotIndex]

        //updating the constraints arrays and divide the entries by the pivot
        for (let i = 0; i < constraintS1.length; i++) {
            constraintS1[i] = constraintS1[i] / pivot
        }

        //changing the value of the other row values
        for (let i = 0; i < constraintS2.length; i++) {
            constraintS2[i] = negateNum * constraintS1[i] + constraintS2[i]
        }
        console.log(constraintS2)

        //for calculating ZJ values
        for (let i = 0; i < constraintS1.length; i++) {
            var tmpArr1 = cjColumn[0] * constraintS1[i]
            var tmpArr2 = cjColumn[1] * constraintS2[i]

            ZjVal[i] = tmpArr1 + tmpArr2
        }
        console.log(ZjVal)




    } else {
        pivotRow = constraintS2
        otherRow = constraintS1
        cjColumn[pivotIndex] = highestNum
        solutionMix[1] = productionMix[1]
        pivot = constraintS2[pivotIndex]
        cjCol = cjColumn[1]
        othercjCol = cjColumn[0]
        slackVal2 = productionMix[pivotIndex]
        cjColumn[pivotIndex] = objFunc[pivotIndex]
        var negateNum = -constraintS1[pivotIndex]
        //updating the constraints arrays and divide the entries by the pivot
        for (let i = 0; i < constraintS2.length; i++) {
            constraintS2[i] = constraintS2[i] / pivot
        }
        //for the other row
        for (let i = 0; i < constraintS2.length; i++) {
            constraintS1[i] = negateNum * constraintS2[i] + constraintS1[i]
            // 
        }

        //calculating Zj values
        for (let i = 0; i < constraintS1.length; i++) {
            var tmpArr1 = cjColumn[0] * constraintS1[i]
            var tmpArr2 = cjColumn[1] * constraintS2[i]

            ZjVal[i] = tmpArr1 + tmpArr2
        }
        console.log(ZjVal)

    }

    console.log(pivotIndex)

    createTableHeadings();

    //create data section

    //cj and solution mix
    var constraint1Tr = document.createElement('tr')
    var cjTd = document.createElement('td')
    var solutionMixTd = document.createElement('td')
    cjTd.textContent = cjColumn[0]
    solutionMixTd.textContent = solutionMix[0]
    constraint1Tr.appendChild(cjTd)
    constraint1Tr.appendChild(solutionMixTd);

    //first constraints
    for(let i = 0; i<constraintS1.length; i++){
        var constraintS1Cell = document.createElement('td')
        constraintS1Cell.textContent = constraintS1[i]
        constraint1Tr.appendChild(constraintS1Cell)
    }
    secondTable.appendChild(constraint1Tr)
    console.log(constraintS1)

    //second constraints
    var constraintS2Tr = document.createElement('tr')
    var secondcjTd = document.createElement('td')
    var secondSolutionMixTd = document.createElement('td')
    secondcjTd.textContent = cjColumn[1]
    secondSolutionMixTd.textContent = solutionMix[1]
    constraintS2Tr.appendChild(secondcjTd)
    constraintS2Tr.appendChild(secondSolutionMixTd);
    for (var i=0 ; i <= constraintS2.length-1; i++)
    {
        var constraintS2Cell = document.createElement('td');
        constraintS2Cell.textContent = constraintS2[i]
        constraintS2Tr.appendChild(constraintS2Cell)
    }
    secondTable.appendChild(constraintS2Tr)
    console.log(constraintS2)


    //create ZJ
    var newRow = document.createElement('tr')
    newRow.id = 'ZjVal';
    var blankCell = document.createElement('td')
    blankCell.textContent = "-"
    var newCell = document.createElement('td')
    newCell.textContent = "Zj"
    newRow.appendChild(blankCell);
    newRow.appendChild(newCell)

    for (let i = 0; i<ZjVal.length; i++){
        var zjCell = document.createElement("td")
        zjCell.textContent = ZjVal[i]
        newRow.appendChild(zjCell)
        
    }
    secondTable.appendChild(newRow)


    


    //problem is the value of Zj keeps on giving 0 results
    console.log(ZjVal)


    // createZJ(secondTable)
    cjMinZjVal(secondTable)
    checkIfOptimized(getOptimization)
    console.log(cjZjVal)
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
    createZJ(myTable)

    //creating the  Cj-ZJ values


    cjMinZjVal(myTable)
    checkIfOptimized()
    getOptimization()

    console.log(objFunc)
    console.log(cjColumn)

})