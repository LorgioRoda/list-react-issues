import Checkbox from '@mui/material/Checkbox/Checkbox'
import React from 'react'

interface CheckComponentProps{
    checked: boolean;
    handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void); 
}

export const CheckComponent = ({ checked, handleChange }: CheckComponentProps) => {
    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
        />
    )
}
