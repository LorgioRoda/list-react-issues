import TextField from '@mui/material/TextField/TextField'
import React from 'react'

interface TextFieldComponentProps {
    label: string;
}

export const TextFieldComponent = ({label}) => {
  return (
    <TextField fullWidth label={label} id="fullWidth" />
  )
}
