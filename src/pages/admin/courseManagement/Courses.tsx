import {
  Button,
  Modal,
  notification,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TCourse, TQueryParam } from "../../../types";
import { courseManagementApi } from "../../../redux/features/Admin/courseManagement.api";
import PhForm from "../../../components/form/PhForm";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import PhSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
export type TTableData = Pick<TCourse, "title" | "code" | "credits">;

const Courses = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: course, isFetching } =
    courseManagementApi.useGetAllCoursesQuery([
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
  const metaData = course?.meta;
  const tableData = course?.data?.map(({ _id, title, code, credits }) => ({
    key: _id,
    title,
    code,
    credits,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title",
      // filters: [
      //   { text: "Fall", value: "Fall" },
      //   { text: "Summer", value: "Summer" },
      //   { text: "Autumn", value: "Autumn" },
      // ],
    },
    {
      title: "Course Code",
      dataIndex: "code",
      // filters: [
      //   { text: "2024", value: "2024" },
      //   { text: "2025", value: "2025" },
      //   { text: "2026", value: "2026" },
      // ],
    },
    {
      title: "Total Credit",
      dataIndex: "credits",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space size="middle">
            <AssignFacultyModal facultyInfo={item} />
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

const AssignFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultyData } =
    userManagementApi.useGetAllFacultiesQuery(undefined);
  const [assignFaculty, { isLoading }] =
    courseManagementApi.useAddFacultiesMutation();

  const facultiesOption = facultyData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${
      item.name.middleName ? item.name.middleName + " " : ""
    }${item.name.lastName}`,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    try {
      await assignFaculty(facultyData).unwrap();
      notification.success({
        message: "Success",
        description: "Faculty assigned successfully!",
      });
      setIsModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an issue assigning the faculty.",
      });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Assign Faculty For this Course"
        open={isModalOpen}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        footer={null}
      >
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty Name"
          />
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Submit
          </Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default Courses;
