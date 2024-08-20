import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Row, Typography } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { toast } from "sonner";
import PhInput from "../../../components/form/PhInput";
import { courseManagementApi } from "../../../redux/features/Admin/courseManagement.api";
import { TResponse } from "../../../constants/global";

const { Title } = Typography;

const CreateCourse = () => {
  const { data: courses } =
    courseManagementApi.useGetAllCoursesQuery(undefined);
  const [addCourse] = courseManagementApi.useAddCourseMutation();

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: `${item.title}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.success("Course Created!!", {
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
          Create Course
        </Title>
        <PhForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="title" label="Course Title" />
            </Col>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="prefix" label="Course Prefix" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="credits" label="Course Credit" />
            </Col>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="code" label="Course Code" />
            </Col>
          </Row>
          <PhSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="Pre Requisite Courses Name"
          />
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateCourse;
