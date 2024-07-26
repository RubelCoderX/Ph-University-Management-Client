import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import { Link } from "react-router-dom";
import { TAdminData, TQueryParam } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<
  TAdminData,
  "id" | "email" | "contactNo" | "name"
>;
const AdminData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
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
  const metaData = adminData?.meta;

  const tableData = adminData?.data?.map(
    ({ _id, id, email, contactNo, name }) => ({
      key: _id,
      id,
      fullName: `${name.firstName} ${
        name.middleName ? name.middleName + " " : ""
      }${name.lastName}`,
      email,
      contactNo,
    })
  );

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
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>

            <Link to={`/admin/student-update/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Button>Block</Button>
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
    <>
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
      />
    </>
  );
};

export default AdminData;
