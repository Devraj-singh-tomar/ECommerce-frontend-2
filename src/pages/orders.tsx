import { ReactElement, useState, useEffect } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useMyOrderQuery } from "../redux/api/orderAPI";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducerTypes";
import toast from "react-hot-toast";
import { CustomError } from "../types/apiTypes";
import { Skeleton } from "../components/loader";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },

  {
    Header: "Quantity",
    accessor: "quantity",
  },

  {
    Header: "Discount",
    accessor: "discount",
  },

  {
    Header: "Amount",
    accessor: "amount",
  },

  {
    Header: "Status",
    accessor: "status",
  },

  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useMyOrderQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders"
  )();

  return (
    <div className="container">
      <h1>My orders</h1>
      {isLoading ? <Skeleton length={13} /> : Table}
    </div>
  );
};

export default Orders;
