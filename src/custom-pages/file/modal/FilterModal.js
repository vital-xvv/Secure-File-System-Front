import React, {useEffect, useState} from 'react';
import {Box, Button, Container, IconButton, Modal, Paper, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {fetchPage} from "../../../app/actions/fileActionCreators";
import storage, { keys } from 'misc/storage';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const FilterModal = ({open, setOpen}) => {
    const [ownerId, setOwnerId] = useState(null);
    const [extension, setExtension] = useState("");
    const [extensionError, setExtensionError] = useState(false);

    const files = useSelector(state => state.files);
    const dispatch = useDispatch();

    useEffect(() => {
        const body = storage.getItem(keys.PAGINATION_FILTER_OBJECT);
        if(body) {
            const parsed = JSON.parse(body);
            setExtension(parsed.extension);
            setOwnerId(parsed.ownerId);
        }
    }, []);

    const handleClose = () => {
        setOpen(!open);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setExtensionError(false);

        if(extension === ''){
            setExtensionError(true);
        }

        if (extension) {

            const body = {
                page: files.page,
                size: files.size,
                ownerId: ownerId,
                extension: extension,
            };

            storage.setItem(keys.PAGINATION_FILTER_OBJECT, JSON.stringify(body))
            handleClose();
            dispatch(fetchPage(body));
        }

    }

    const handleReset = (e) => {
        e.preventDefault();
        setExtensionError(false);
        setExtension("");
        setOwnerId(null);

        const body = {
            page: files.page,
            size: files.size,
            ownerId: ownerId,
            extension: extension,
        };

        storage.setItem(keys.PAGINATION_FILTER_OBJECT, JSON.stringify(body));
        handleClose();
        dispatch(fetchPage(body));
    }

    return (
        <Modal
            open={open}
            aria-labelledby="Filter"
        >
            <Paper sx={{ ...style}}>
                <Box sx=
                         {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px"
                        }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{marginBottom: 0}}
                        color="textSecondary"
                    >
                        Filter
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                <form noValidate autoComplete="off">
                    <Stack gap={2}>
                        <TextField
                            onChange={e => setExtension(e.target.value)}
                            variant="outlined"
                            label="Extension"
                            fullWidth
                            value={extension}
                            error={extensionError}
                        />
                        <TextField
                            onChange={e => setOwnerId(parseInt(e.target.value))}
                            variant="outlined"
                            label="Owner Id"
                            type="number"
                            inputProps={{min: 1}}
                            fullWidth
                            value={ownerId}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                            //endIcon={<KeyboardArrowRightIcon/>}
                        >
                            Submit
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={(e) => handleReset(e)}
                            color="error"
                        >
                            Reset
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Modal>
    );
};

export default FilterModal;