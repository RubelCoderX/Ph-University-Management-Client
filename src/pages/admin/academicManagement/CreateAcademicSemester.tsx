import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Row, Typography } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const { Title } = Typography;

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] =
    academicManagementApi.useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = semesterOptions[Number(data.name) - 1]?.label;
    const toastId = toast.loading("Creating...");
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.success("Semester Created!!", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Academic Semester
        </Title>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PhSelect
            name="name"
            label="Academic Semester Name"
            options={semesterOptions}
          />
          <PhSelect
            name="year"
            label="Academic Semester Year"
            options={yearOptions}
          />
          <PhSelect
            name="startMonth"
            label="Academic Semester Start Month"
            options={monthOptions}
          />
          <PhSelect
            name="endMonth"
            label="Academic Semester End Month"
            options={monthOptions}
          />
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicSemester;
