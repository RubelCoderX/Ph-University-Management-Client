import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Row, Typography } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { toast } from "sonner";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { courseManagementApi } from "../../../redux/features/Admin/courseManagement.api";
import { TResponse } from "../../../constants/global";

const { Title } = Typography;

const SemesterRegistration = () => {
  const [addSemesterRegistration, { isLoading }] =
    courseManagementApi.useAddSemesterRegistrationMutation();
  const { data: academicSemester } =
    academicManagementApi.useGetAllSemestersQuery([
      {
        name: "sort",
        value: "year",
      },
    ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemesterRegistration(
        semesterData
      )) as TResponse<any>;
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
          Create Semester Registration
        </Title>
        <PhForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhSelect
                name="academicSemester"
                label="Academic Semester Name"
                options={academicSemesterOptions}
              />
            </Col>
            <Col xs={24} sm={12}>
              <PhSelect
                name="status"
                label="Semester Status"
                options={semesterStatusOptions}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhDatePicker name="startDate" label="Start Date" />
            </Col>
            <Col xs={24} sm={12}>
              <PhDatePicker name="endDate" label="End Date" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="minCredit" label="Min Credit" />
            </Col>
            <Col xs={24} sm={12}>
              <PhInput type="text" name="maxCredit" label="Max Credit" />
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

export default SemesterRegistration;
