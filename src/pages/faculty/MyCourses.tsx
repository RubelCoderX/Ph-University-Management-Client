import { Button, Col, Flex } from "antd";
import PhForm from "../../components/form/PhForm";
import PhSelect from "../../components/form/PhSelect";
import { facultyApi } from "../../redux/features/faculty/facultyApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const { data: facultyCoursesData } =
    facultyApi.useGetMyOfferedCourseQuery(undefined);
  //   console.log(facultyCoursesData);
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
    <Flex style={{ marginTop: "30px" }} justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <PhSelect options={courseOptions} name="course" label="Course" />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
