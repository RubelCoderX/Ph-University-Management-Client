import { Button, Col, Row } from "antd";
import { Typography } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

const { Title } = Typography;

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty, { isLoading }] =
    academicManagementApi.useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      await addAcademicFaculty(data).unwrap();
      toast.success("Academic Faculty is Created", {
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
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Academic Faculty
        </Title>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PhInput
            name="name"
            type="text"
            label="  Academic Faculty Name"
          ></PhInput>

          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicFaculty;
