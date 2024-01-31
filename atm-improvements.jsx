const ATMDeposit = ({ onChange, isDeposit, isValid, isPositive, isValidCashBack }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3 id="atm-type"> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
      {!isPositive && <p style={{color: "red"}}>Must be a positive value</p>}
      {!isValidCashBack && <p style={{color: "red"}}>Must be less than account balance</p>}
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [isPositive, setIsPositive] = React.useState(true);
  const [isValidCashBack, setIsValidCashBack] = React.useState(true);
  

  let status = `$${totalState} `;
  
  const handleChange = (event) => {
    if(event.target.value <= 0){
      setValidTransaction(false);
      setIsPositive(false);
      return;
    }else{
      setIsPositive(true);
    }
    if(atmMode === "Cash Back" && event.target.value > totalState){
      setValidTransaction(false);
      setIsValidCashBack(false);
    }else{
      setValidTransaction(true);
      setIsValidCashBack(true);
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
    setAtmMode(event.target.value);
    if(event.target.value === "Deposit"){
      setIsDeposit(true)
    }else if(event.target.value === "Cash Back"){
      setIsDeposit(false)
    }else{
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 id="account-title">{'Account Balance'}</h3>
      <h1 id="total">{status}</h1>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} isPositive={isPositive} isValidCashBack={isValidCashBack}></ATMDeposit>}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
