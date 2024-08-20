import { Form, Input } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  control?: Control<FieldValues, any>;
  disabled?: boolean;
};

const PhInput = ({ type, name, label, control, disabled }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
