class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");

    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");

    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //submit budget form
  submitBudgetForm(){
    console.log('hello from es6');
    const value = this.budgetInput.value;
    console.log("1 budgetInput ", value);
    if(value === "" || value <=0){
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = '<p>Value can not be empty or negative</p>';
      const uiObj = this;
     // console.log(uiObj);
      setTimeout(()=>{
        uiObj.budgetFeedback.classList.remove('showItem');
        //console.log(uiObj);
        //console.log(this);
      }, 3500);
    }else{
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }

  showBalance(){
    console.log('Show balance');
    const expense = this.totalExpense();
    console.log('expense: ', expense);
    const total = parseInt(this.budgetAmount.textContent) - expense;
    console.log('total: ', total);
    this.balanceAmount.textContent = total;
    if(total<0){
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    if(total>0){
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }else if(total === 0){
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  submitExpenseForm(){
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if(expenseValue ===0 || amountValue === '' || amountValue === 0){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = '<p> values cannnot be empty or negative</p>';
      const self = this;
      setInterval(()=>{
        self.expenseFeedback.classList.remove('showItem');
      }, 3000);
    }
    else{
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value  = '';
      let expense = {
        id:this.itemID,
        title: expenseValue,
        amount: amount
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      //showBalance
      this.showBalance();
    }
  }

  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense">
                        <div class="expense-item d-flex justify-content-between align-items-baseline">

                          <h6 class="expense-title mb-0 text-uppercase list-item">- $${expense.title}</h6>
                          <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

                            <div class="expense-icons list-item">

                              <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                              <i class="fas fa-edit"></i>
                              </a>
                              <a href="#" class="delete-icon" data-id="${expense.id}">
                              <i class="fas fa-trash"></i>
                              </a>
                            </div>
                        </div>        
                    </div>`;
      this.expenseList.appendChild(div);
  }

  totalExpense(){
    let total = 0;
    if (this.itemList.length>0){
      total = this.itemList.reduce((acc, curr)=>{
        console.log(`TOtal is ${acc} and the current value is ${curr.amount}`);
        acc += parseInt(curr.amount);
        return acc;
      },0);
    }
    console.log("-------total: ", total);
    this.expenseAmount.textContent = total;
    return total;
  }

  //EditExpense
  editExpense(element){
    let id = parseInt(element.dataset.id);
    console.log("id: ", id);
    console.log("parent0 : ", element.parentElement);
    console.log("parent1 : ", element.parentElement.parentElement);
    console.log("parent2: ", element.parentElement.parentElement.parentElement);
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    console.log("parent: ", parent);
    this.expenseList.removeChild(parent);
    //remove from the list
    let expense = this.itemList.filter((item)=>{
      return item.id === id;
    });
    //show value
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    //remove from list
    let tempList = this.itemList.filter((item)=>{
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }
  
  //deleteExpese
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    console.log("id: ", id);
    let parent = element.parentElement.parentElement.parentElement.parentElement;
    console.log("parent: ", parent);
    this.expenseList.removeChild(parent);
    //remove from list
     let tempList = this.itemList.filter((item)=>{
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }

}/////UI CLASS

function eventListeners(){
  console.log("I N I T");
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  //new Instance of UI
  const ui = new UI();

  //budgetForm submit
  budgetForm.addEventListener('submit', function(event){
    console.log('Form ', event);
    event.preventDefault();
    ui.submitBudgetForm();
  });

  //expenseForm submit
  expenseForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    ui.submitExpenseForm();
  });

  //expenseList click
  expenseList.addEventListener('click', (event)=>{
   if(event.target.parentElement.classList.contains('edit-icon')){
    ui.editExpense(event.target.parentElement);
   }    
   else if(event.target.parentElement.classList.contains('delete-icon')){
    ui.deleteExpense(event.target.parentElement);
  }
  });

} // eventListeners

document.addEventListener('DOMContentLoaded', () =>{
  eventListeners();
});