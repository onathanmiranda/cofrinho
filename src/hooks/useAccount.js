import { useSelector } from "react-redux";

export default function useAccount(id) {
  if (!id)
    throw new Error(
      `You must provide an account ID{int} to useAccount Hook. Provided ${id} instead.`
    );

  const leftOvers =
    useSelector(({ leftovers }) =>
      leftovers.items.find(({ account }) => id === account)
    )?.amount || 0;

  const account = useSelector(({ accounts }) =>
    accounts.items.find((account) => account.id === id)
  );

  const accountBudget = useSelector(
    ({ earnings }) => earnings.totalEarned * account?.quota
  );

  const expenses = useSelector(({ expenses }) =>
    expenses.items.filter((expense) => expense.account === id)
  );

  const accountAvailable = accountBudget + leftOvers;

  const totalSpent = expenses.reduce(
    (accumulator, expense) => accumulator + expense.amount,
    0
  );

  const remainingTotal = accountAvailable - totalSpent;

  return {
    leftOvers,
    account,
    accountBudget,
    expenses,
    accountAvailable,
    totalSpent,
    remainingTotal,
  };
}
