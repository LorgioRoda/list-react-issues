import TextField from '@mui/material/TextField';

interface TextFieldComponentProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextFieldComponent = ({ label, value, onChange }: TextFieldComponentProps) => {
  return (
    <TextField 
      fullWidth 
      label={label} 
      id="fullWidth" 
      value={value} 
      onChange={onChange}
      variant='outlined'
      size='small'
    />
  );
};
