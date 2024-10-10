import { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/loader";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AllDiscountResponse } from "../../types/apiTypes";
import { useFetchData } from "6pp";
import { RootState, server } from "../../redux/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface DataType {
  _id: string;
  amount: number;
  code: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Discount = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    data,
    loading: isLoading,
    error,
  } = useFetchData<AllDiscountResponse>(
    `${server}/api/v1/payment/coupon/all?id=${user?._id}`,
    "discount-codes"
  );

  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.coupons.map((i) => ({
          _id: i._id,
          amount: i.amount,
          code: i.code,
          action: <Link to={`/admin/discount/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={13} /> : Table}</main>
      <Link to="/admin/discount/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
