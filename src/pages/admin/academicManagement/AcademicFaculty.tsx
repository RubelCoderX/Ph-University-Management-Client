import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import moment from "moment";

type DataType = {
  key: React.Key;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const AcademicFaculty = () => {
  const { data: facultyData } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined);

  const tableData = facultyData?.data?.map(
    ({ _id, name, createdAt, updatedAt }) => ({
      key: _id,
      name,
      createdAt: moment(new Date(createdAt)).format("MMMM"),
      updatedAt: moment(new Date(updatedAt)).format("MMMM"),
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        scroll={{ x: "max-content" }} // Enable horizontal scrolling
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicFaculty;
