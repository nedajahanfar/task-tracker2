//variables
let totalExpenses = 0;
let expenses = [];

//DOM elements
let form = document.querySelector(".input-form");
let expensesList = document.querySelector(".expenses");
let TexpensesContainer = document.querySelector(".Texpenses");
let clearHistoryBtn = document.querySelector(".clear-history-btn");
let BalanceContainer = document.querySelector(".balance");

// ======= Program Initialization ======= 
// Prompt user for total income and start the application

let value = prompt("enter your total income to start : ");
let Tincome = sanitizer(value);

function runApp(){

loadStoredExpenses();

updateFinance();

form.addEventListener("submit" ,(event)=> {
  event.preventDefault();
  addToList();
});

clearHistoryBtn.addEventListener("click" , ()=>{
  localStorage.removeItem("expenses");
  expenses = [];
  totalExpenses = 0;
  renderArray(expenses);
  updateFinance();
})

};

runApp();

// ======= End of Initialization ======= 


// ======= Functions ======= 

function sanitizer(value){

  if(value === null){
    alert("You pressed Cancel. Exiting app");
    window.close();
    return;
  }

  let data = Number(value);
  while(!Number.isInteger(data) || value.trim() === ""){
    value = prompt("enter a valid integer : ");
    if(value === null){
      alert("You pressed Cancel. Exiting app");
      window.close();
      return;
    }
    data = Number(value);
  }

  return data;
}

function loadStoredExpenses(){
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  totalExpenses = expenses.reduce((sum, item) => sum + item.cost, 0);
  renderArray(expenses);
}

function updateFinance(){ 
  updateTincome();
  updateTexpenses();
  updateBalance();
  }
  
  function updateTincome(){
    let totalRemainedContainer = document.querySelector(".totalRemained");
    totalRemained = Tincome - totalExpenses;
    totalRemainedContainer.innerHTML = `Total : ${totalRemained}`;
  }
  
  function updateTexpenses(){
    let TexpensesContainer = document.querySelector(".Texpenses");
    TexpensesContainer.innerHTML = `Total expenses : ${totalExpenses}`;
  }
  
  function updateBalance(){
    let balanceContainer = document.querySelector(".balance");
    
    let balance = totalRemained;  
    
    balanceContainer.innerHTML = `Balance: ${balance}`;
    
    if(balance < Tincome * 0.2){   // If less than 20% of total income
      balanceContainer.style.color = "red";
    } else if(balance < Tincome * 0.5){  // If less than 50%
      balanceContainer.style.color = "orange";
    } else {
      balanceContainer.style.color = "green";
    }
  }

  function addToList(){
    addItem();
    renderArray(expenses);
    updateFinance();
  };
  
  function addItem(){
  
    let expenseName = document.querySelector("#Ename").value;
    let expenseCategory = document.querySelector("#options").value;
    let expenseCost = Number(document.querySelector("#Eamount").value);
  
  
    if(expenseCost > Tincome - totalExpenses){
      alert("This item exceeds your budget!");
      return;
    }
  
    if(expenseName && expenseCost && expenseCategory){
      expenses.push({
        name: expenseName,
        cost: expenseCost,
        category: expenseCategory
      })
    }else{
        alert("Please fill in all fields!");
        return;
    }
  
    localStorage.setItem("expenses",JSON.stringify(expenses));
  
    totalExpenses += expenseCost;
    updateFinance();
  
  }
  
  
  function renderArray(arr){
  
    expensesList.innerHTML = "";
  
    for(let i = 0;i < arr.length;i++){
      expensesList.innerHTML += `<li> <p class="expense-name">${arr[i].name}</p>
      <button class="delete-btn" onclick = "deleteItem(${i})">delete</button>
      <button class="edit-btn" onclick = "editItem(${i})">edit</button>
    </li> `;
    }
  }


function deleteItem(index){
  totalExpenses -= expenses[index].cost;
  expenses.splice(index,1);
  localStorage.setItem("expenses",JSON.stringify(expenses));
  renderArray(expenses);
  updateFinance();

}

function editItem(index){
  let newName = prompt("Enter the updated expense name:").trim();
  if(!newName) return;
  expenses[index].name = newName;
  localStorage.setItem("expenses",JSON.stringify(expenses));
  renderArray(expenses);
}










