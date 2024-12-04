import {Box, Button, Container, Modal, Stack, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import {deleteUserById} from "../../../app/actions/userListActionCreators";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    fontFamily: 'Roboto',
    pt: 2,
    px: 4,
    pb: 3,
};

const ConfirmModal = ({ open, setOpen, userId}) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {variant});
        setOpen(!open);
        dispatch(deleteUserById(userId));

    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Stack sx={{ ...style, width: 400 }} gap={3}>
                <Typography variant="h4">Delete user?</Typography>
                <Typography variant="h6">
                    A user with ID {userId} will be permanently deleted...
                </Typography>
                <Container sx={{display: "flex", justifyContent: "space-around"}}>
                    <Button variant="contained" onClick={() => setOpen(!open)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => handleClick("Deleted!", "success")}>Confirm</Button>
                </Container>
            </Stack>
        </Modal>
    );
};

export default ConfirmModal;