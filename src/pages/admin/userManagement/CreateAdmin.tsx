import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import PhSelect from "../../../components/form/PhSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PhDatePicker from "../../../components/form/PhDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import { toast } from "sonner";
import { useState } from "react";
const { Title } = Typography;

const defaultValues = {
  id: "A-0001",
  user: "667538a57db8dad3fc1dd93d",
  name: {
    firstName: "Prince",
    middleName: "",
    lastName: "Rubel",
  },
  designation: "Assistant Principal",
  // dateOfBirth: "1999-12-21T00:00:00.000Z",
  email: "mdrubel29879@gamil.com",
  gender: "male",
  bloodGroup: "O+",
  contactNo: "+1234567890",
  emergencyContactNo: "+0987654321",
  presentAddress: "123 Main St, Cityville, ST, 12345",
  permanentAddress: "456 Elm St, Hometown, HT, 67890",

  isDeleted: false,
};
const CreateAdmin = () => {
  const [addAdmin] = userManagementApi.useAddAdminMutation();
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      const adminData = {
        password: "admin@123",
        admin: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(adminData));
      formData.append("file", data.image);

      await addAdmin(formData).unwrap();
      toast.success("Admin Created Successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`Error: ${error?.data?.errorSources}`, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Title level={2} style={{ textAlign: "center", margin: "30px" }}>
          Create Admin
        </Title>
      </Col>
      <Col span={24}>
        <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              ></Controller>
            </Col>
          </Row>
          <Divider>Contact Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Button htmlType="submit" type="primary" loading={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
