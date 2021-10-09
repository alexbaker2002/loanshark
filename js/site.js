/** Alex Baker 2021 
 * Created at Coder Foundry Bootcamp
 * 
 * Basic Website Template for showing challenges on Portfolio
 * 
 * Javascript 
 * 
 * 
 * 
 * ///
 * tableTemplate -- 5 table rows no headers
 * 
 * //sweet alert
 * Swal.fire(msg);
 */



//  Mortgage Calculator
// 1 - get user inputs 
function getValues(){
    let loanAmount = document.getElementById("").value;

    let term = document.getElementById("").value;

    let interestRate = document.getElementById('myPercent').value / 100;


    let calculatedRate = calcRate(interestRate);

    let payment = calculatePayment(loanAmount, calculatedRate, term);

    let totalPayments = calcPaymentSchedule(loanAmount, calculatedRate, term, payment);
  
}

// calclulate the interest rate  - this is the division by 1200 pdf
function calcRate(){}



// calculate monthly payment - Amount times rate divided by the complicated math from the PDF math.pow()
function calcPayment(){}

// calc the interestbased on the current balance in rate from step 2
// this function is called by step 4 but you need to build it first
// intrest per payment
function calcInterest(){}


// now that we know the rate and monthly payment we bould out our payment schedule
// this is the big function of the application
// let obj = {
//     month:
//     payment:
//     principal:
//     interest:
//     totalInterest:
//     balance:
// }

function calcPaymentSchedule(){}


// display all of the calculated information to the payment schedule table
// use template structure from Fizzbuzz to output your data