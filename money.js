const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const formatter = new Intl.NumberFormat("en-US",{
    style:"currency",
    currency: "LKR",
    signDisplay: "always",
});

const list=document.getElementById("transactionlist");
const form = document.getElementById("transactionForm");
const status =document.getElementById("status");  
const balance=document.getElementById("balance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");


form.addEventListener("submit", addTransaction);



renderList();
updateTotal();
drawpiechart();


function updateTotal()
{
    const incomeTotal=transactions
    .filter(trx=>trx.type==="income")
    .reduce((total,trx)=>total +trx.amount,0);

    const expenseTotal=transactions
    .filter(trx=>trx.type==="expense")
    .reduce((total,trx)=>total +trx.amount,0);

    const balanceTotal=incomeTotal-expenseTotal;

    balance.textContent =formatter.format(balanceTotal).substring(1);
    income.textContent =formatter.format(incomeTotal);
    expense.textContent =formatter.format(expenseTotal * -1);

    const  foodTotal = transactions
    .filter(trx=>trx.name==="Food")
    .reduce((total,trx)=>total +trx.amount,0);

    const  transportTotal = transactions
    .filter(trx=>trx.name==="Transport")
    .reduce((total,trx)=>total +trx.amount,0);

    const  educationTotal = transactions
    .filter(trx=>trx.name==="Education")
    .reduce((total,trx)=>total +trx.amount,0);

    const  utilitiesTotal = transactions
    .filter(trx=>trx.name==="Utilities")
    .reduce((total,trx)=>total +trx.amount,0);


    const  otherexpenseTotal = transactions
    .filter(trx=>trx.name==="Other Expense")
    .reduce((total,trx)=>total +trx.amount,0);

    const  salaryTotal = transactions
    .filter(trx=>trx.name==="Salary")
    .reduce((total,trx)=>total +trx.amount,0);
    
    const  businessincomeTotal = transactions
    .filter(trx=>trx.name==="Business Income")
    .reduce((total,trx)=>total +trx.amount,0);

    const  otherincomeTotal = transactions
    .filter(trx=>trx.name==="Other Income")
    .reduce((total,trx)=>total +trx.amount,0);


}



function renderList(){
    list.innerHTML  = "";

    if(transactions.length  === 0){
        status.textContent  = "No transactions.";
        return;
    }
    else{
        status.textContent = "";
    }


    transactions.forEach(({id, name, amount, date , type})=> {
        const sign = "income" === type ? 1 : -1;
        const li=document.createElement("li");

        li.innerHTML = `
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>

            <div class="amount ${type}">
                <span>${formatter.format(amount * sign)}</span>
            </div>

            <div class="action">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})">
            <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z " />
            </svg>
           
          
            </div>

        `;

        list.appendChild(li);
    }
    )
}

renderList();
updateTotal();

function deleteTransaction(id) {
    const index = transactions.findIndex((trx) => trx.id === id);
    transactions.splice(index, 1);
  
    updateTotal();
    saveTransactions();
    renderList();
  }


  function addTransaction(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const newTransaction = {
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
    };

    transactions.push(newTransaction);

    const  foodTotal = transactions
    .filter(trx=>trx.name==="Food")
    .reduce((total,trx)=>total +trx.amount,0);

    const  transportTotal = transactions
    .filter(trx=>trx.name==="Transport")
    .reduce((total,trx)=>total +trx.amount,0);

    const  educationTotal = transactions
    .filter(trx=>trx.name==="Education")
    .reduce((total,trx)=>total +trx.amount,0);

    const  utilitiesTotal = transactions
    .filter(trx=>trx.name==="Utilities")
    .reduce((total,trx)=>total +trx.amount,0);


    const  otherexpenseTotal = transactions
    .filter(trx=>trx.name==="Other Expense")
    .reduce((total,trx)=>total +trx.amount,0);

    const  salaryTotal = transactions
    .filter(trx=>trx.name==="Salary")
    .reduce((total,trx)=>total +trx.amount,0);
    
    const  businessincomeTotal = transactions
    .filter(trx=>trx.name==="Business Income")
    .reduce((total,trx)=>total +trx.amount,0);

    const  otherincomeTotal = transactions
    .filter(trx=>trx.name==="Other Income")
    .reduce((total,trx)=>total +trx.amount,0);
    // Do any additional processing here before redirection

    const queryString = Object.keys(newTransaction)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(newTransaction[key]))
        .join('&');

    // Optionally perform additional processing here

    // Redirect to analyze.html after processing
    

    this.reset();
    updateTotal();
    saveTransactions();
    renderList();
}




function saveTransactions()
{
    transactions.sort((a,b)=>new Date(b.date)-new Date(a.date));

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

