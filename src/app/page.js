"use client";

import { useState } from "react";
// import Head from "next/head";
// import { useMetadata } from "../hooks/useMetadata";

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
      monthlySalary: Number(monthlySalary).toLocaleString(),
      monthlyTax: monthlyTax.toLocaleString(),
      monthlySalaryAfterTax: monthlySalaryAfterTax.toLocaleString(),
      annualSalary: Number(annualSalary).toLocaleString(),
      annualTax: annualTax.toLocaleString(),
      annualSalaryAfterTax: annualSalaryAfterTax.toLocaleString(),
    });
  };

  return (
    <>
      <div className="flex bg-gray-100 h-[100vh]">
        <div className="container mx-auto my-8 grid grid-cols-1 rounded-lg bg-white p-4 shadow-lg sm:p-8 lg:grid-cols-12">
          <div className="col-span-4 mb-8 lg:mr-12">
            <div>
              <h1 className="mb-6 text-3xl font-bold text-black sm:text-4xl">
                Salary{" "}
                <span className=" bg-[#f26122] bg-clip-text text-transparent">
                  Tax Calculator
                </span>
              </h1>
              <p className="text-lg text-black sm:text-[18px]">
                Apart from compliance, signing up with our online tax return
                portal allows you to access an easy to use tax return calculator
                that lays out all figures for you in a comprehensible manner.
                Our salary tax calculator is constantly updated with the latest
                regulations and tax rates in Pakistan.
              </p>
            </div>
          </div>
          <div className="col-span-8">
            <div className="border-2 border-[#00000032] p-4 sm:p-8">
              <div className="mx-auto w-full max-w-md">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <input
                    type="number"
                    className="w-full rounded-md border bg-white px-3 py-2 text-black"
                    placeholder="Enter your monthly salary"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 rounded-md bg-[#21346d] px-5 py-2 font-semibold text-white transition duration-200"
                  >
                    Calculate
                  </button>
                </form>
              </div>

              <div className="mx-auto mt-8 grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border-2 border-[#e8e8e8] py-4 text-center shadow-xl shadow-[#21346d3a]">
                  <div className="mt-2 bg-[#21346d1f] py-4">
                    <h2 className="mb-2 bg-[#21346d] bg-clip-text text-xl font-medium text-transparent">
                      Monthly Salary
                    </h2>
                    <h2 className="text-xl font-bold text-black">
                      {results.monthlySalary}
                    </h2>
                  </div>
                  <div className="py-4">
                    <h2 className="mb-2 bg-[#21346d] bg-clip-text text-xl font-medium text-transparent">
                      Yearly Salary
                    </h2>
                    <h2 className="text-xl font-bold text-black">
                      {results.annualSalary}
                    </h2>
                  </div>
                </div>
                <div className="border-2 border-[#e8e8e8] py-4 text-center shadow-xl shadow-[#21346d3a]">
                  <div className="mt-2 bg-[#21346d1f] py-4">
                    <h2 className="mb-2 bg-[#21346d] bg-clip-text text-xl font-medium text-transparent">
                      Monthly Tax
                    </h2>
                    <h2 className="text-xl font-bold text-black">
                      {results.monthlyTax}
                    </h2>
                  </div>
                  <div className="py-4">
                    <h2 className="mb-2 bg-[#21346d] bg-clip-text text-xl font-medium text-transparent">
                      Yearly Tax
                    </h2>
                    <h2 className="text-xl font-bold text-black">
                      {results.annualTax}
                    </h2>
                  </div>
                </div>
                <div className="border-2 border-[#e8e8e8] py-4 text-center shadow-xl shadow-[#21346d3a]">
                  <div className="mt-2 bg-[#21346d1f] py-4">
                    <h2 className="mb-2 bg-[#21346d] bg-clip-text text-xl font-medium text-transparent">
                      Salary After Tax
                    </h2>
                    <h2 className="text-xl font-bold text-black">
                      {results.monthlySalaryAfterTax}
                    </h2>
                  </div>
                  <div className="py-4">
                    <h2 className="mb-2 bg-[#21346d] bg-clip-text text-xl font-medium text-transparent">
                      Salary After Tax (Yearly)
                    </h2>
                    <h2 className="text-xl font-bold text-black">
                      {results.annualSalaryAfterTax}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;