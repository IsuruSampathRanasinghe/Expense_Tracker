import React from "react";
import { LuDownload } from "react-icons/lu";
import Expense from "../../pages/Dashboard/Expense";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({transactions, onDelete, onDownload}) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">All Expenses</h5>

                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((Expense) => (
                    <TransactionInfoCard
                        key={Expense._id}
                        title={Expense.category}
                        icon={Expense.icon}
                        date={moment(Expense.date).format("Do MMM YYYY")}
                        amount={Expense.amount}
                        type="expense"
                        onDelete={() => onDelete(Expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList