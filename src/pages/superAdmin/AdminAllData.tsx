import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";

import { Link } from "react-router-dom";

import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { TAdminData, TQueryParam } from "../../types";
import { userManagementApi } from "../../redux/features/Admin/userManagement.api";

export type TTableData = Pick<
  TAdminData,
  "id" | "email" | "contactNo" | "name" | "user"
>;

const AdminAllData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [deleteAdmin] = userManagementApi.useDeleteAdminMutation();
  const { data: adminData, isFetching } = userManagementApi.useGetAllAdminQuery(
    [
      {
        name: "page",
        value: page,
      },
      {
        name: "sort",
        value: "id",
      },
      ...params,
    ]
  );
  const [statusChanged] = userManagementApi.useStatusChangedMutation();
  const metaData = adminData?.meta;

  const tableData = adminData?.data?.map(
    ({ _id, id, email, contactNo, name, user }) => ({
      key: _id,
      id,
      userId: user?._id,
      fullName: `${name.firstName} ${
        name.middleName ? name.middleName + " " : ""
      }${name.lastName}`,
      email,
      contactNo,
      status: user?.status,
    })
  );
  const handleDelete = async (adminId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAdmin(adminId).unwrap();
          toast.success("Student deleted successfully!", {
            position: "top-center",
          });
        } catch (error) {
          const errorMessage =
            error?.data?.message || "Failed to delete student.";
          toast.error(errorMessage, { position: "top-center" });
        }
      }
    });
  };
  const handleStatusChange = async (adminId: string, currentStatus: string) => {
    const newStatus = currentStatus === "blocked" ? "in-progress" : "blocked";

    Swal.fire({
      title: `Are you sure you want to change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await statusChanged({ id: adminId, status: newStatus }).unwrap();
          toast.success(`Student status changed to ${newStatus}!`, {
            position: "top-center",
          });
        } catch (error) {
          const errorMessage =
            error?.data?.message || "Failed to change status.";
          toast.error(errorMessage, { position: "top-center" });
        }
      }
    });
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Admin ID",
      key: "_id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/superAdmin/admin-data/${item.key}`}>
              <Button>Details</Button>
            </Link>

            <Link to={`/superAdmin/admin-update/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={() => handleDelete(item.key)}>Delete</Button>
            <Button
              onClick={() => handleStatusChange(item.userId, item.status)}
            >
              {item.status === "blocked" ? "In-Progress" : "Block"}
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];
  const onChange: TableProps<TAdminData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
    }
  };
  return (
    <div style={{ marginTop: "30px" }}>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default AdminAllData;
