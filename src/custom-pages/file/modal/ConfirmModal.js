import React from 'react';
import {Box, Button, Container, Modal, Paper, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteFileById} from "../../../app/actions/fileActionCreators";
import {useSnackbar} from "notistack";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ConfirmModal = ({open, setOpen}) => {
    const files = useSelector(state => state.files);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setOpen(!open);
    }

    const callback = (state) => {
        enqueueSnackbar(state.snackBar.message, {variant: state.snackBar.variant});
        handleClose();
    }

    const handleDelete = () => {
        dispatch(deleteFileById(files.currFileId, callback));
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Delete File"
            aria-describedby=""
        >
            <Paper sx={{ ...style}}>
                <Stack gap={2}>
                    <Typography variant="h4">Delete File?</Typography>
                    <Typography variant="body1" sx={{fontSize: "18px"}}>
                        Are you sure you want to delete a file with id {files.currFileId}?
                    </Typography>
                    <Container sx={{display: "flex", justifyContent: "space-around"}}>
                        <Button onClick={handleClose} variant="contained">Cancel</Button>
                        <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                    </Container>
                </Stack>
            </Paper>
        </Modal>
    );
};

export default ConfirmModal;