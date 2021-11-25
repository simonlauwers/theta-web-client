import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import WhiteTextField from '../formInputs/WhiteTextField';







const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    return (
        <Stack style={{ maxWidth: "50%" }}>
            <WhiteTextField
                label="Email"
                id="email"
                variant="filled"
            />
            <WhiteTextField
                label="Password"
                style={{ marginTop: 25 }}
                id="email"
                type="password"
                variant="filled"
            />            <Button style={{ marginTop: 25, backgroundColor: "ghostwhite", color: "#141124", fontWeight: "bold" }} variant="contained">Login</Button>
        </Stack>
    );




}

export default LoginForm;