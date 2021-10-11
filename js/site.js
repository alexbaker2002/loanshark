/** Alex Baker 2021 
 * Created at Coder Foundry Bootcamp
 * 
 * Javascript 

 * 
 * //sweet alert
 * Swal.fire(msg);
 */

/**
 * 
 * payment object
 * 
 * 
 * 
 * // let obj = {
 //     month:    int
 //     payment: decimal .00
 //     principal: decimal .00
 //     interest: decimal .00
 //     totalInterest: decimal .00
 //     balance: decimal .00
        paid : bool
 // }
 * 
 * 
 */

var schedule = [];


//  Mortgage Calculator
// 1 - get user inputs 
function getValues() {
    // get values from Input
    let loanAmount = parseFloat(document.getElementById("inputLoanAmount").value.replace(/[^0-9\.]/ig, ''));
    let term = parseFloat(document.getElementById("inputLoanTerm").value);
    let interestRate = document.getElementById('inputInterestRate').value;
    // clears the array
     document.getElementById("paymentsTableBody").innerHTML = "";
     schedule = [];

    disableUserinputs();

    //validate inputs were given and are numbers or reset form and alert user
    if (isNaN(loanAmount) || isNaN(term) || isNaN(interestRate)) {
        document.getElementById("inputForm").reset();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You can only enter numbers!',
            footer: 'You have coused an Error!!'
        })
    }

    let calculatedRate = calcRate(interestRate);

    let payment = calculatePayment(loanAmount, calculatedRate, term);
    //payment = parseFloat(payment);

    calcPaymentSchedule(loanAmount, calculatedRate, term, payment);

    displayPayments(loanAmount);

}

// calclulate the interest rate  - this is the division by 1200 pdf
function calcRate(interestRate) {
    let rate = interestRate / 1200;
    return rate;
}


// calculate monthly payment - Amount times rate divided by the complicated math from the PDF math.pow()
function calculatePayment(loanAmount, calculatedRate, term) {

    let montlyPayment = 0;
    let months = term * 12;
    a = loanAmount * calculatedRate;
    b = a / (1 - Math.pow((1 + calculatedRate), -months));
    montlyPayment = parseFloat(b.toFixed(2));
    return montlyPayment;
}

// calc the interest based on the current balance and rate from step 2
// this function is called by step 4 but you need to build it first
// returns intrest per payment
function calcInterest(rate, balance) {
    let totalInterest = Math.round(((balance * rate) + Number.EPSILON) * 100) / 100;
    return totalInterest;
}


// now that we know the rate and monthly payment we build out our payment schedule

function calcPaymentSchedule(loanAmount, calculatedRate, term, payment) {
   
    let numberOfPayments = term * 12;
    let balance = loanAmount;
    let totalI = 0;
    let newPrincipal = 0;
    let interestPay = 0;


    for (let i = 0; i < numberOfPayments; i++) {

        interestPay = calcInterest(calculatedRate, balance)
        totalI = Math.round(((totalI += interestPay) + Number.EPSILON) * 100) / 100;
        newPrincipal = Math.round(((payment - interestPay) + Number.EPSILON) * 100) / 100;
        balance = Math.round(((balance - newPrincipal) + Number.EPSILON) * 100) / 100;


        if (i == numberOfPayments - 1) {
            if (balance > 0) {
                payment += balance;
                
                balance = 0;

            } 
        }
        if (i == numberOfPayments - 2) {
            if (balance < payment) {
                payment = balance;
                balance = 0;

            }



        let paymentRow = {
            month: i + 1,
            monthlyPayment: parseFloat(payment.toFixed(2)),
            principal: parseFloat(newPrincipal.toFixed(2)),
            interestPayment: parseFloat(interestPay.toFixed(2)),
            totalInterest: parseFloat(totalI.toFixed(2)),
            remainingBalance: parseFloat(balance.toFixed(2))

        }

        schedule.push(paymentRow)
    }

    return schedule;
}



// display all of the calculated information to the payment schedule table
// use template structure from Fizzbuzz to output your data
function displayPayments(loanAmount) {



    let table = document.getElementById("paymentsTable");
    let template = document.getElementById("paymentsTableTemplate");
    let tableBody = document.getElementById("paymentsTableBody");



    schedule.forEach((i) => {
        let row = document.importNode(template.content, true);
        let cols = row.querySelectorAll("td");
        let colth = row.querySelector("th");
        colth.textContent = i.month;
        cols[0].textContent = `${createNumberString(i.monthlyPayment)}`;
        cols[1].textContent = `${createNumberString(i.principal)}`;
        cols[2].textContent = `${createNumberString(i.interestPayment)}`;
        cols[3].textContent = `${createNumberString(i.totalInterest)}`;
        cols[4].textContent = `${createNumberString(i.remainingBalance)}`;


        tableBody.appendChild(row);
    })

    let totalInterest = schedule[schedule.length - 1].totalInterest;

    document.getElementById("paymentAmount").innerHTML =
        schedule[schedule.length - 1].monthlyPayment;
    document.getElementById("loanAmount").innerHTML = `${createNumberString(loanAmount)}`;

    document.getElementById("totint").innerHTML = `${createNumberString(totalInterest)}`;
    let loantotal = loanAmount + totalInterest;
    document.getElementById("total").innerHTML = `${createNumberString(loantotal)}`;


}


// resets the form
function resetForm() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // clear form
            document.getElementById("inputForm").reset();
            document.getElementById("paymentsTableBody").innerHTML = "";
            document.getElementById("paymentAmount").innerHTML = "";
            document.getElementById("loanAmount").innerHTML = "";
            document.getElementById("totint").innerHTML = "";
            document.getElementById("total").innerHTML = "";
            schedule = [];
            enableUserinputs();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}

function createNumberString(number) {
    let str = `$ ${number.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    return str;
}

function disableUserinputs(){
    document.getElementById("inputLoanAmount").setAttribute("disabled", "");
    document.getElementById("inputLoanTerm").setAttribute("disabled", "");
    document.getElementById("inputInterestRate").setAttribute("disabled", "");
    document.getElementById("btnSubmit").setAttribute("disabled", "");
}
function enableUserinputs() {
    document.getElementById("inputLoanAmount").removeAttribute("disabled");
    document.getElementById("inputLoanTerm").removeAttribute("disabled");
    document.getElementById("inputInterestRate").removeAttribute("disabled");
    document.getElementById("btnSubmit").removeAttribute("disabled");
}