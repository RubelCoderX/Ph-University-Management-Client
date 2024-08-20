import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Row, Typography } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";
import PhInput from "../../../components/form/PhInput";
import { courseManagementApi } from "../../../redux/features/Admin/courseManagement.api";
import { TResponse } from "../../../constants/global";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import { DaysOption } from "../../../constants/semester";
import { useState } from "react";
import PhSelectWithWatch from "../../../components/form/PhSelectWithWatch";
import PhTimePicker from "../../../components/form/PhTimePicker";

const { Title } = Typography;

const validateTimeFormat = (time: string) => {
  // Regular expression to validate HH:MM format (24-hour clock)
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timePattern.test(time);
};

const OfferedCourse = () => {
  const [id, setId] = useState("");
  const [addOfferedCourse, { isLoading }] =
    courseManagementApi.useAddOfferedCourseMutation();
  const { data: semesterRegistration } =
    courseManagementApi.useGetAllSemesterRegistrationQuery(undefined);
  const { data: academicFaculty } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined);
  const { data: academicDeparment } =
    academicManagementApi.useGetAllDepartmentQuery(undefined);
  const { data: course } = courseManagementApi.useGetAllCoursesQuery(undefined);
  const { data: courseFaculties, isFetching: fetchingFaculties } =
    courseManagementApi.useGetCourseFacultiesQuery(
      { courseId: id },
      { skip: !id }
    );
  const { data: allFaculties } =
    userManagementApi.useGetAllFacultiesQuery(undefined);

  const semesterRegistrationOptions = semesterRegistration?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.status}`,
    })
  );
  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));
  const academicDepartmentOptions = academicDeparment?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));
  const courseOptions = course?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));

  const allFacultiesOptions = allFaculties?.data?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${
      item.name.middleName ? item.name.middleName + " " : ""
    }${item.name.lastName}`,
  }));

  const facultiesOptions = courseFaculties?.data?.faculties?.map((item) => ({
    value: item._id,
    label: `${item.name.firstName} ${
      item.name.middleName ? item.name.middleName + " " : ""
    }${item.name.lastName}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    // Validate time format for startTime and endTime
    if (!validateTimeFormat(data.startTime)) {
      toast.error(
        'Invalid start time format, expected "HH:MM" in 24 hours format',
        {
          id: toastId,
        }
      );
      return;
    }

    if (!validateTimeFormat(data.endTime)) {
      toast.error(
        'Invalid end time format, expected "HH:MM" in 24 hours format',
        {
          id: toastId,
        }
      );
      return;
    }

    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
    };

    try {
      const res = (await addOfferedCourse(offeredCourseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.success("Semester Created!!", {
          position: "top-center",
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Offered Courses
        </Title>
        <PhForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <Row gutter={20}>
            <Col xs={24} sm={12}>
              <PhSelect
                name="semesterRegistration"
                label="Semester Registration"
                options={semesterRegistrationOptions}
              />
            </Col>
            <Col xs={24} sm={12}>
              <PhSelect
                name="academicFaculty"
                label="Academic Faculty"
                options={academicFacultyOptions}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhSelect
                name="academicDepartment"
                label="Academic Department"
                options={academicDepartmentOptions}
              />
            </Col>
            <Col xs={24} sm={12}>
              <PhSelectWithWatch
                name="course"
                label="Course Name"
                options={courseOptions}
                onValueChange={setId}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhSelect
                disabled={!id || fetchingFaculties}
                name="faculty"
                label="Faculty Name"
                options={
                  facultiesOptions && facultiesOptions.length > 0
                    ? facultiesOptions
                    : allFacultiesOptions
                }
              />
            </Col>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="maxCapacity" label="maxCapacity" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="section" label="Section" />
            </Col>
            <Col xs={24} sm={12}>
              <PhSelect
                options={DaysOption}
                mode="multiple"
                name="days"
                label="Days"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhTimePicker name="startTime" label="Start Time" />
            </Col>
            <Col xs={24} sm={12}>
              <PhTimePicker name="endTime" label="End Time" />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default OfferedCourse;
