

const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async(req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income and expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount"}}},
        ]);

        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount"}}},
        ]);

        // Get income transaction in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});

        // Get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expenses)
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expenses",
                })
            ),
        ].sort((a, b) => b.date - a.date);   // Sort latest first

        // Final Response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error});
    }
    
}


/*

const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Single optimized query using $facet
        const [result] = await Income.aggregate([
            { $match: { userId: userObjectId } },
            {
                $facet: {
                    totalIncome: [
                        { $group: { _id: null, total: { $sum: "$amount" } } }
                    ],
                    last30Income: [
                        {
                            $match: {
                                date: { 
                                    $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
                                }
                            }
                        },
                        { $group: { _id: null, total: { $sum: "$amount" } } }
                    ],
                }
            }
        ]);

        const [expenseResult] = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            {
                $facet: {
                    totalExpense: [
                        { $group: { _id: null, total: { $sum: "$amount" } } }
                    ],
                    last30Expense: [
                        {
                            $match: {
                                date: { 
                                    $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
                                }
                            }
                        },
                        { $group: { _id: null, total: { $sum: "$amount" } } }
                    ],
                }
            }
        ]);

        // Safe extraction using optional chaining
        const totalIncome = result.totalIncome?.[0]?.total || 0;
        const last30Income = result.last30Income?.[0]?.total || 0;

        const totalExpense = expenseResult.totalExpense?.[0]?.total || 0;
        const last30Expense = expenseResult.last30Expense?.[0]?.total || 0;

        res.json({
            success: true,
            totalIncome,
            totalExpense,
            last30Income,
            last30Expense,
            balance: totalIncome - totalExpense
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

*/