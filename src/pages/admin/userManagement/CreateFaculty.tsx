import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import PhSelect from "../../../components/form/PhSelect";
import PhDatePicker from "../../../components/form/PhDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { toast } from "sonner";
import { useState } from "react";
const { Title } = Typography;

// const defaultValues = {
//   designation: "Professor",
//   name: {
//     firstName: "Vivek",
//     middleName: "",
//     lastName: "Neupane",
//   },
//   gender: "male",
//   // dateOfBirth: "1985-04-12T00:00:00.000Z",
//   email: "vivek@gmail.com",
//   contactNo: "+1234567890",
//   emergencyContactNo: "+0987654321",
//   bloodGroup: "O+",
//   presentAddress: "123 Main St, Cityville, ST, 12345",
//   permanentAddress: "456 Elm St, Hometown, HT, 67890",

//   // academicDepartment: "667533e4b859d6fbfcdf597d",
//   isDeleted: false,
// };

const CreateFaculty = () => {
  const [addFaculty] = userManagementApi.useAddFacultyMutation();
  const [loading, setLoading] = useState(false);

  const { data: departmentData } =
    academicManagementApi.useGetAllAcademicDepartmentQuery(undefined);

  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      const facultyData = {
        password: "faculty@123",
        faculty: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(facultyData));
      formData.append("file", data.image);

      await addFaculty(formData).unwrap();
      toast.success("Admin Created Successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(`Error: ${error?.data?.message}`, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Title level={2} style={{ textAlign: "center", margin: "16px 0" }}>
          Create Faculty
        </Title>
      </Col>
      <Col span={24}>
        <PhForm onSubmit={onSubmit}>
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
          <Divider>Department Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
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

export default CreateFaculty;
