import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { creaUserApi } from "./api/SportsDayApiService";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const NewUserComponent = () => {
    const [open, setOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('');
    const [modalBody, setModalBody] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length > 20) {
            newErrors.username = 'Username must be 20 characters or less';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignUp = () => {
        const user = {
            firstname: formData.firstName,
            lastname: formData.lastName,
            username: formData.username,
            email: formData.email
        }
        if (validateForm()) {
            creaUserApi(user)
                .then((response) => {
                    setModalHeader('Congratulations!');
                    setModalBody('User Created Successfully');
                    setOpen(true);
                })
                .catch((error) => {
                    setModalHeader('Error');
                    setModalBody(error.response.data.message);
                    setOpen(true);
                    console.error('Error fetching events:', error);
                });

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                username: '',
            });
            setErrors({});
        }
    };

    return (
        <Container maxWidth="xs">
            <h2>Sign Up</h2>
            <form>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    fullWidth
                    style={{ marginTop: '20px' }}
                    data-testid="sign-up-button"
                >
                    Sign Up
                </Button>
            </form>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        {modalHeader}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {modalBody}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    );
};
export default NewUserComponent