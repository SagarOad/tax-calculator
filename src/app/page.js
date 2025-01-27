"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const page = () => {
  const [monthlySalary, setMonthlySalary] = useState("");
  const [results, setResults] = useState({
    monthlySalary: 0,
    monthlyTax: 0,
    monthlySalaryAfterTax: 0,
    annualSalary: 0,
    annualTax: 0,
    annualSalaryAfterTax: 0,
  });

  const calculateTax = (annualIncome) => {
    if (annualIncome <= 600000) return 0;
    if (annualIncome <= 1200000) return ((annualIncome - 600000) / 100) * 5;
    if (annualIncome <= 2200000) return 30000 + (annualIncome - 1200000) * 0.15;
    if (annualIncome <= 3200000) return 180000 + (annualIncome - 2200000) * 0.25;
    if (annualIncome <= 4100000) return 430000 + (annualIncome - 3200000) * 0.3;
    return 700000 + (annualIncome - 4100000) * 0.35;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const annualSalary = monthlySalary * 12;
    const annualTax = calculateTax(annualSalary);
    const annualSalaryAfterTax = annualSalary - annualTax;
    const monthlyTax = annualTax / 12;
    const monthlySalaryAfterTax = annualSalaryAfterTax / 12;

    setResults({
      monthlySalary: Number(monthlySalary),
      monthlyTax: monthlyTax,
      monthlySalaryAfterTax: monthlySalaryAfterTax,
      annualSalary: annualSalary,
      annualTax: annualTax,
      annualSalaryAfterTax: annualSalaryAfterTax,
    });
  };

  const chartData = {
    labels: ["Annual Tax", "Annual Salary After Tax"],
    datasets: [
      {
        data: [results.annualTax, results.annualSalaryAfterTax],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-8">
          <h1 className="text-4xl font-bold">Enhanced Salary Tax Calculator</h1>
          <p className="text-lg mt-2">
            A comprehensive tool to calculate your taxes and visualize your income breakdown.
          </p>
        </div>

        {/* Content */}
        <div className="container mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="col-span-4 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-4">About This Tool</h2>
            <p className="text-gray-700 mb-4">
              This calculator helps you understand your income distribution based on the latest
              tax regulations in Pakistan. It provides detailed insights into your monthly and
              yearly salary, tax deductions, and take-home income.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="number"
                className="w-full rounded-md border px-4 py-2 text-gray-800"
                placeholder="Enter your monthly salary"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Calculate
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="col-span-8 bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Monthly and Yearly Details */}
              {Object.entries(results).map(([key, value]) => (
                <div
                  key={key}
                  className="border rounded-lg p-4 shadow-md text-center bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Income Distribution</h3>
              <Pie data={chartData} />
            </div>

            {/* Tax Bracket Table */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Tax Brackets</h3>
              <table className="table-auto w-full border-collapse border text-black border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Income Range</th>
                    <th className="border border-gray-300 px-4 py-2">Tax Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Up to 600,000</td>
                    <td className="border border-gray-300 px-4 py-2">0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">600,001 - 1,200,000</td>
                    <td className="border border-gray-300 px-4 py-2">5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1,200,001 - 2,200,000</td>
                    <td className="border border-gray-300 px-4 py-2">15%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2,200,001 - 3,200,000</td>
                    <td className="border border-gray-300 px-4 py-2">25%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">3,200,001 - 4,100,000</td>
                    <td className="border border-gray-300 px-4 py-2">30%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Above 4,100,000</td>
                    <td className="border border-gray-300 px-4 py-2">35%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>Created by Arham</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default page;
