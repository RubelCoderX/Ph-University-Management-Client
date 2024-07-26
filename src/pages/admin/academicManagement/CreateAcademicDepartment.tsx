import { Button, Col, Row } from "antd";
import { Typography } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhSelect from "../../../components/form/PhSelect";
const { Title } = Typography;

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment, { isLoading }] =
    academicManagementApi.useAddAcademicDepartmentMutation();
  const { data: academicFaculty } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined);

  const facultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      await addAcademicDepartment(data).unwrap();
      toast.success("Academic Department is Created", {
        id: toastId,
        position: "top-center",
      });
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Failed to create Academic Faculty";
      toast.error(errorMessage, { id: toastId, position: "top-center" });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={18} md={14} lg={12} xl={10} xxl={8}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Create Academic Department
        </Title>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PhInput
            name="name"
            type="text"
            label="Academic Department Name"
          ></PhInput>

          <PhSelect
            name="academicFaculty"
            options={facultyOptions}
            label=" Academic Faculty Name"
          />

          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicDepartment;
