import { useParams } from "react-router-dom";
import { facultyApi } from "../../redux/features/faculty/facultyApi";
import { useState } from "react";
import { TOfferedCourses, TQueryParam, TSemester, TStudent } from "../../types";
import {
  Button,
  Modal,
  notification,
  Pagination,
  Space,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import PhForm from "../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhInput from "../../components/form/PhInput";

const MyCourseStudent = () => {
  const { registerSemesterId, courseId } = useParams();
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: facultyCoursesData, isFetching } =
    facultyApi.useGetAllFacultyCourseQuery([
      {
        name: "semesterRegistration",
        value: registerSemesterId,
      },
      {
        name: "course",
        value: courseId,
      },
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

  const metaData = facultyCoursesData?.meta;
  const tableData = facultyCoursesData?.data?.map(
    ({
      _id,
      student,
      semesterRegistration,
      offeredCourse,
    }: {
      _id: string;
      student: TStudent;
      semesterRegistration: TSemester;
      offeredCourse: TOfferedCourses;
    }) => ({
      fullName: `${student.name.firstName} ${
        student.name.middleName ? student.name.middleName + " " : ""
      }${student.name.lastName}`,
      id: student.id,
      email: student.email,
      contactNo: student.contactNo,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );
  const columns: TableColumnsType = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Enrollment No",
      key: "id",
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
      key: "action",
      render: (item) => {
        return (
          <Space size="middle">
            <AddMarksModal studetnInfo={item} />
          </Space>
        );
      },
      width: "15%",
    },
  ];
  const onChange: TableProps["onChange"] = (
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
      {isFetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)", // Adjust if you have a header
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
            pagination={false}
            scroll={{ x: true }}
            style={{ overflowX: "auto" }}
          />
          <Pagination
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={metaData?.limit}
            total={metaData?.total}
            style={{ marginTop: 16 }}
          />
        </>
      )}
    </div>
  );
};
const AddMarksModal = ({ studetnInfo }) => {
  const [addMarks, { isLoading }] = facultyApi.useAddCourseMarksMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const marksData = {
      semesterRegistration: studetnInfo.semesterRegistration,
      offeredCourse: studetnInfo.offeredCourse,
      student: studetnInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        classTest2: Number(data.classTest2),
        midTerm: Number(data.midTerm),
        finalTerm: Number(data.finalTerm),
      },
    };
    console.log(marksData);
    try {
      await addMarks(marksData).unwrap();
      notification.success({
        message: "Success",
        description: "Marks Updated successfully!",
      });
      setIsModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an issue update the marks.",
      });
    }
  };

  return (
    <>
      <Button onClick={showModal}>Update Result</Button>
      <Modal
        title="Update Marks For this Course"
        open={isModalOpen}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        footer={null}
      >
        <PhForm onSubmit={onSubmit}>
          <PhInput
            type="text"
            name="classTest1"
            label="First Class Test Result"
          />
          <PhInput
            type="text"
            name="classTest2"
            label="Second Class Test Result "
          />
          <PhInput type="text" name="midTerm" label="Mid Term Result " />
          <PhInput type="text" name="finalTerm" label="Final Term Result " />
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Update Marks
          </Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default MyCourseStudent;
