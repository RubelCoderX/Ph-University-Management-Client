import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userManagementApi } from "../../redux/features/Admin/userManagement.api";
import { academicManagementApi } from "../../redux/features/Admin/academicManagement.api";
import PhInput from "../../components/form/PhInput";
import PhSelect from "../../components/form/PhSelect";
import PhDatePicker from "../../components/form/PhDatePicker";
import PhForm from "../../components/form/PhForm";
import { bloodGroupOptions, genderOptions } from "../../constants/global";
const { Title } = Typography;

type InputConfig = {
  component: "input" | "select" | "datepicker" | "file";
  name: string;
  label: string;
  options?: Array<{ value: string; label: string }>;
  disabled?: boolean;
};

const AdminUpdate = () => {
  const { adminId } = useParams();
  const [updateAdmin] = userManagementApi.useUpdateAdminMutation();
  const { data: adminData, isLoading: studentLoading } =
    userManagementApi.useGetAdminByIdQuery(adminId);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      name: { firstName: "", middleName: "", lastName: "" },
      gender: "",
      dateOfBirth: null,
      bloodGroup: "",
      image: null,
      email: "",
      contactNo: "",
      emergencyContactNo: "",
      presentAddress: "",
      permanentAddress: "",
    },
  });

  useEffect(() => {
    if (adminData) {
      const fields = [
        ["name.firstName", adminData.data.name.firstName],
        ["name.middleName", adminData.data.name.middleName],
        ["name.lastName", adminData.data.name.lastName],
        ["gender", adminData.data.gender],
        ["dateOfBirth", adminData.data.dateOfBirth],
        ["bloodGroup", adminData.data.bloodGroup],
        ["image", adminData.data.image],
        ["email", adminData.data.email],
        ["contactNo", adminData.data.contactNo],
        ["emergencyContactNo", adminData.data.emergencyContactNo],
        ["presentAddress", adminData.data.presentAddress],
        ["permanentAddress", adminData.data.permanentAddress],
      ];
      fields.forEach(([field, value]) => setValue(field, value));
    }
  }, [adminData, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const adminData = {
      admin: {
        ...data,
      },
    };
    try {
      await updateAdmin({ adminId, data: adminData }).unwrap();
      toast.success("Admin Data Update is Successful!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Error updating student", { position: "top-center" });
    }
  };

  if (studentLoading) return <div>Loading...</div>;

  const renderInputs = (inputs: InputConfig[]) =>
    inputs.map((input) => (
      <Col key={input.name} span={24} md={{ span: 12 }} lg={{ span: 8 }}>
        {input.component === "input" && (
          <PhInput
            control={control}
            type="text"
            name={input.name}
            label={input.label}
          />
        )}
        {input.component === "select" && (
          <PhSelect
            options={input.options}
            name={input.name}
            label={input.label}
            disabled={input.disabled}
          />
        )}
        {input.component === "datepicker" && (
          <PhDatePicker name={input.name} label={input.label} />
        )}
        {input.component === "file" && (
          <Controller
            name={input.name}
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label={input.label}>
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              </Form.Item>
            )}
          />
        )}
      </Col>
    ));

  const personalInfo: InputConfig[] = [
    { component: "input", name: "name.firstName", label: "First Name" },
    { component: "input", name: "name.middleName", label: "Middle Name" },
    { component: "input", name: "name.lastName", label: "Last Name" },
    {
      component: "select",
      name: "gender",
      label: "Gender",
      options: genderOptions,
    },
    { component: "datepicker", name: "dateOfBirth", label: "Date Of Birth" },
    {
      component: "select",
      name: "bloodGroup",
      label: "Blood Group",
      options: bloodGroupOptions,
    },
    { component: "file", name: "image", label: "Profile Picture" },
  ];

  const contactInfo: InputConfig[] = [
    { component: "input", name: "email", label: "Email" },
    { component: "input", name: "contactNo", label: "Contact No" },
    {
      component: "input",
      name: "emergencyContactNo",
      label: "Emergency Contact No",
    },
    { component: "input", name: "presentAddress", label: "Present Address" },
    {
      component: "input",
      name: "permanentAddress",
      label: "Permanent Address",
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Title level={2} style={{ textAlign: "center", marginTop: "30px" }}>
          Update Admin Data
        </Title>
      </Col>
      <Col span={24}>
        <PhForm onSubmit={handleSubmit(onSubmit)}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>{renderInputs(personalInfo)}</Row>
          <Divider>Contact Information</Divider>
          <Row gutter={8}>{renderInputs(contactInfo)}</Row>

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default AdminUpdate;
