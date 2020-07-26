import React from "react";
import Transaction from "./Transaction";

export default function TransactionList(props) {
  const {
    data,
    loading,
    deleteTransaction,
    handleModal,
    setCurrentTransaction,
  } = props;
  let previous = 1;

  return (
    <span>
      {loading ? (
        <div class="boxCenter">
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {data.map((transaction) => {
            const flag = previous !== transaction.day;
            previous = transaction.day;
            return (
              <>
                {flag && <div style={{ height: 15 }} />}
                <Transaction
                  key={transaction._id}
                  transaction={transaction}
                  deleteTransaction={deleteTransaction}
                  handleModal={handleModal}
                  setCurrentTransaction={setCurrentTransaction}
                />
              </>
            );
          })}
        </div>
      )}
    </span>
  );
}
