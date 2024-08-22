import { Button, Col, Row, Typography } from "antd";
import PhForm from "../../components/form/PhForm";
import PhSelect from "../../components/form/PhSelect";
import { facultyApi } from "../../redux/features/faculty/facultyApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const MyCourses = () => {
  const navigate = useNavigate();
  const { data: facultyCoursesData } =
    facultyApi.useGetAllFacultyCourseQuery(undefined);

  const semesterOptions = facultyCoursesData?.data?.map((item) => ({
    label: `${item.academicSemester.name}${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));
  const courseOptions = facultyCoursesData?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <Row style={{ marginTop: "30px" }} justify="center">
      <Col xs={22} sm={16} md={12} lg={8}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          My All Courses
        </Title>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <PhSelect options={courseOptions} name="course" label="Course" />
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default MyCourses;
