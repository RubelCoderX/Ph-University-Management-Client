import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PhDatePicker from "../../../components/form/PhDatePicker";
import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import { toast } from "sonner";
const { Title } = Typography;

//! this is only for development
//! Should be removed

// const studentDefaultValues = {
//   name: {
//     firstName: "Hamim",
//     middleName: "",
//     lastName: "Islam",
//   },
//   gender: "male",
//   // dateOfBirth: "2000-01-01",
//   email: "sunandita@gmail.com",
//   contactNo: "1234567987",
//   emergencyContactNo: "0987654321",
//   bloodGroup: "A+",
//   presentAddress: "123 Main St, Springfield, IL",
//   permanentAddress: "456 Elm St, Springfield, IL",
//   guardian: {
//     fatherName: "James Doe",
//     fatherOccupation: "Engineer",
//     fatherContactNo: "1112223333",
//     motherName: "Jane Doe",
//     motherOccupation: "Teacher",
//     motherContactNo: "4445556666",
//   },
//   localGuardian: {
//     name: "Michael Smith",
//     occupation: "Lawyer",
//     contactNo: "7778889999",
//     address: "789 Oak St, Springfield, IL",
//   },
//   // admissionSemester: "667535b3b859d6fbfcdf5989",

//   // academicDepartment: "667533e4b859d6fbfcdf597d",
// };

const CreateStudent = () => {
  const [addStudent] = userManagementApi.useAddStudentMutation();

  const { data: semesterData, isLoading: sIsLoading } =
    academicManagementApi.useGetAllSemestersQuery(undefined);

  const { data: departmentData, isLoading: dIsLoading } =
    academicManagementApi.useGetAllAcademicDepartmentQuery(undefined, {
      skip: sIsLoading,
    });
  // for Academic Semester
  const semesterOptions = semesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  // for Academic Department
  const departmentOptions = departmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    addStudent(formData);
    toast.success("Student Created is Successfull!", {
      position: "top-center",
    });
  };
  return (
    <Row>
      <Col span={24}>
        <Title level={2} style={{ textAlign: "center", margin: "16px 0" }}>
          Create Student
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
          <Divider>Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
          </Row>
          <Divider>Local Guardian Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="localGuardian.name" label=" Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
