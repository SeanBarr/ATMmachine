const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <div className="col-12"> 
  <label className="form-label fs-5" for="number-input">
  {choice[Number(!isDeposit)]}
  </label>
  <div className="input-group">
  <input className="form-control fs-5" id="number-input" type="number" width="200" onChange={onChange}></input>
  <input className="btn btn-primary fs-5" type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
  </div>
  </div>
  );
};

const Account = () => {
  // let deposit = 0; // state of this transaction
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
    <h1 className="py-5 mb-0 text-light fs-1 fw-bold text-center bg-dark bg-gradient">ATM Machine</h1>
    <div className="d-flex flex-column flex-grow-1 py-4 container bg-light bg-gradient justify-content-center">
    <form className="row row-cols-md-2 g-3 align-items-center text-dark" onSubmit={handleSubmit}>
    <div className="col-12">
    <label className="form-label fs-5" for="mode-select">Select an action below to continue</label>
    <select className="form-select fs-5" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
    <option id="no-selection" value=""></option>
    <option id="deposit-selection" value="Deposit">
    Deposit
    </option>
    <option id="cashback-selection" value="Cash Back">
    Cash Back
    </option>
    </select>
    </div>
    {atmMode && (
    <ATMDeposit
    onChange={handleChange}
    isDeposit={isDeposit}
    isValid={validTransaction}
    ></ATMDeposit>
    )}
    </form>
    <h2 id="total" className="mt-4 mb-0 text-dark fs-2 fw-bolder text-center">Account Balance ${totalState}</h2>
    </div>
    <footer className="py-2 text-light fs-5 fw-bold text-center bg-dark bg-gradient"><p>Sean@2021</p>
    </footer>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
