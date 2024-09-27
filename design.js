
const balance = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInputs = document.getElementsByName('type');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
function updateUI() {
  transactionList.innerHTML = '';
  let totalBalance = 0;

  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add(transaction.type === 'income' ? 'income' : 'expense');
    if (transaction.type === 'income') {
      totalBalance += transaction.amount;
    } else {
      totalBalance -= transaction.amount;
    }
    li.innerHTML = `${transaction.description} - $${transaction.amount.toFixed(2)} 
      <button onclick="removeTransaction(${transaction.id})">x</button>`;

    transactionList.appendChild(li);
  });
  balance.textContent = `$${totalBalance.toFixed(2)}`;
}

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = Array.from(typeInputs).find(input => input.checked).value;
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  form.reset();
  updateUI();
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateUI();
}
form.addEventListener('submit', addTransaction);
updateUI();
