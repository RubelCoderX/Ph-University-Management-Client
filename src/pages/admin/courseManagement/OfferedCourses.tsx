import {
  Button,
  Dropdown,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { useState } from "react";
import { TOfferedCourses, TQueryParam } from "../../../types";
import { toast } from "sonner";
import { courseManagementApi } from "../../../redux/features/Admin/courseManagement.api";

export type TTableData = Pick<
  TOfferedCourses,
  | "academicDepartment"
  | "course"
  | "days"
  | "startTime"
  | "endTime"
  | "academicFaculty"
  | "faculty"
  | "maxCapacity"
  | "section"
  | "semesterRegistration"
  | "academicSemester"
>;

const OfferedCourses = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: offeredCourses, isFetching } =
    courseManagementApi.useGetAllOfferedCoursesQuery([
      {
        name: "page",
        value: page,
      },
      {
        name: "sort",
        value: "id",
      },
      ...params,
    ]);

  const [deleteAcademicSemester] =
    academicManagementApi.useDeleteAcademicSemesterMutation();
  const metaData = offeredCourses?.meta;
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

  const tableData = offeredCourses?.data?.map(
    ({
      _id,
      course,
      startTime,
      endTime,
      semesterRegistration,
      faculty,
      maxCapacity,
      section,
      academicDepartment,
      academicFaculty,
      academicSemester,
    }) => ({
      key: _id,
      faculty: `${faculty?.name?.firstName} ${
        faculty?.name?.middleName ? faculty.name.middleName + " " : ""
      }${faculty?.name?.lastName}`,
      maxCapacity,
      academicDepartment: academicDepartment.name,
      academicFaculty: academicFaculty?.name,
      semesterRegistration: semesterRegistration?.status,
      courseName: course?.title,
      academicSemester: academicSemester?.name,
      startTime,
      endTime,
      section,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      // filters: [
      //   { text: "Fall", value: "Fall" },
      //   { text: "Summer", value: "Summer" },
      //   { text: "Autumn", value: "Autumn" },
      // ],
    },
    {
      title: "Faculty Name",
      dataIndex: "faculty",
    },
    {
      title: "Semester Name",
      dataIndex: "academicSemester",
    },
    {
      title: "Registration Status",
      dataIndex: "semesterRegistration",
    },
    {
      title: "Academic F.Name",
      dataIndex: "academicFaculty",
    },

    {
      title: "Department Name",
      dataIndex: "academicDepartment",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space size="middle">
            <Button>Update</Button>
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

export default OfferedCourses;
