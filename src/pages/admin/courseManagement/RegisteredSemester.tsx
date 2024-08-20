import {
  Button,
  Dropdown,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { useState } from "react";
import { TQueryParam, TSemester } from "../../../types";
import { toast } from "sonner";
import { courseManagementApi } from "../../../redux/features/Admin/courseManagement.api";
import moment from "moment";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TTableData = Pick<
  TSemester,
  "_id" | "startDate" | "endDate" | "status"
>;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongonig",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] =
    courseManagementApi.useUpdateSemesterStatusMutation();

  const { data: semesterData, isFetching } =
    courseManagementApi.useGetAllSemesterRegistrationQuery(params);

  const [deleteAcademicSemester] =
    academicManagementApi.useDeleteAcademicSemesterMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteAcademicSemester(id).unwrap();
      toast.success("Academic Semester deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Failed to delete Academic Semester.";
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name} (${academicSemester?.year})`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );
  const handleStatusUpdate: SubmitHandler<FieldValues> = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        { text: "Fall", value: "Fall" },
        { text: "Summer", value: "Summer" },
        { text: "Autumn", value: "Autumn" },
      ],
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "2024", value: "2024" },
        { text: "2025", value: "2025" },
        { text: "2026", value: "2026" },
      ],
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Data",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space size="middle">
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setSemesterId(item.key)}>
                Update Status
              </Button>
            </Dropdown>
            <Button onClick={() => handleDelete(item.key)}>Delete</Button>
          </Space>
        );
      },
      width: "15%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
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
        scroll={{ x: "max-content" }}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default RegisteredSemester;
