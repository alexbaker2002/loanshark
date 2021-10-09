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






//  Mortgage Calculator
// 1 - get user inputs 
function getValues() {
    // get values from Input
    let loanAmount = parseInt(document.getElementById("inputLoanAmount").value.replace(/[^0-9\.]/ig, ''));
    let term = parseInt(document.getElementById("inputLoanTerm").value);
    let interestRate = document.getElementById('inputInterestRate').value / 100;

    //validate inputs were given and are numbers or reset form and alertuser
    if (isNaN(loanAmount) || isNaN(term) || isNaN(interestRate) ){
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

    //let totalPayments = calcPaymentSchedule(loanAmount, calculatedRate, term, payment);

   //  storePaymentSchedual();

   //  displayPayments();

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
    a = loanAmount * calculatedRate ;
    b = a / (1 - Math.pow((1 + calculatedRate) ,-months));
    montlyPayment = b;
    return montlyPayment;
}

// calc the interest based on the current balance and rate from step 2
// this function is called by step 4 but you need to build it first
// returns intrest per payment
function calcInterest(rate, balance) {
     let totalInterest = 0;
     totalInterest = balance * rate;
     return totalInterest;
}


// now that we know the rate and monthly payment we bould out our payment schedule
// this is the big function of the application
function calcPaymentSchedule(loanAmount, calculatedRate, term, payment) {



}

function storePaymentSchedule(){
let paymentSchedule = JSON.parse(localStorage.getItem("paymentSchedule")) || [];


localStorage.setItem("paymentSchedule", JSON.stringify(paymentSchedule))
}


// display all of the calculated information to the payment schedule table
// use template structure from Fizzbuzz to output your data
function displayPayments(){
    let paymentSchedule = localStorage.getItem("paymentSchedule") || [];

}


// resets the form
function resetForm(){
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
            //clear local storage
            localStorage.getItem("paymentSchedule").clear();
            // enable inputs and button

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}