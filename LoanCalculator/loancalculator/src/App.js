import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './App.css'; 

const App = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanDuration, setLoanDuration] = useState(1);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfMonths = loanDuration * 12;

    if (interestRate && loanDuration) {
      const emi = loanAmount * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
      const totalAmountPayable = emi * numberOfMonths;
      const totalInterestPayable = totalAmountPayable - loanAmount;

      setMonthlyEMI(emi);
      setTotalInterest(totalInterestPayable);
      setTotalAmount(totalAmountPayable);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanDuration]);

  return (
    <div className="emi-calculator-container">
      <div className="emi-calculator">
        <h2>EMI Loan Repayment Calculator</h2>
        <label>Loan Amount: {loanAmount}</label>
        <input type="range" min="1000" max="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
        <label>Interest Rate (p.a.): {interestRate}%</label>
        <input type="range" min="1" max="15" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
        <label>Loan Duration (years): {loanDuration}</label>
        <input type="range" min="1" max="30" value={loanDuration} onChange={(e) => setLoanDuration(Number(e.target.value))} />
        
        <div className="results">
          <p>Monthly EMI: {monthlyEMI.toFixed(2)}</p>
          <p>Total Interest: {totalInterest.toFixed(2)}</p>
          <p>Total Amount Repayable: {totalAmount.toFixed(2)}</p>
        </div>
        <button className="apply-now-btn">Apply Now</button>
      </div>
      <div className="pie-chart-container">
        <PieChart
          data={[
            { title: 'Principal', value: loanAmount, color: '#E38627' },
            { title: 'Total Interest', value: totalInterest, color: '#C13C37' },
          ]}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={{
            fontSize: '5px',
            fontFamily: 'sans-serif',
          }}
          labelPosition={112}
        />
      </div>
    </div>
  );
};

export default App;
