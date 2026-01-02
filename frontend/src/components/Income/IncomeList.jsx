import React from "react";
import { LuDownload } from "react-icons/lu";
import Income from "../../pages/Dashboard/Income";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({transactions, onDelete, onDownload}) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>

                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((Income) => (
                    <TransactionInfoCard
                        key={Income._id}
                        title={Income.source}
                        icon={Income.icon}
                        date={moment(Income.date).format("Do MMM YYYY")}
                        amount={Income.amount}
                        type="income"
                        onDelete={() => onDelete(Income._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList