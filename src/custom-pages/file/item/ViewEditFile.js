import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Container,
    FormControl, FormHelperText, IconButton,
    InputLabel,
    MenuItem, OutlinedInput,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import {updateFile} from "../../../app/actions/fileActionCreators";
import {getAllLanguages} from '../../../app/api/fileApi';
import {useSnackbar} from "notistack";
import storage, {keys} from "../../../misc/storage";

const style = {
    position: 'absolute',
    top: '14%',
    right: '15%',
    transform: 'translate(-50%, -50%)',
    p: "20px"

};

const style2 = {
    position: 'absolute',
    top: '14%',
    left: '18%',
    transform: 'translate(-50%, -50%)',
    p: "20px"

};

const errorInitialState = {
    fileNameError: {isPresent: false, message: ''},
    extensionError: {isPresent: false, message: ''},
    sizeError: {isPresent: false, message: ''},
    ownerIdError: {isPresent: false, message: ''},
    langError: {isPresent: false, message: ''}
};


const ViewEditFile = () => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const files = useSelector(state => state.files);
    const [currFile,setCurrFile] = useState(JSON.parse(storage.getItem(keys.CURRENT_FILE_OBJECT)));
    const [fullLanguageList, setFullLanguageList] = useState([]);

    //From state
    const [fileName, setFileName] = useState(currFile.fileName);
    const [extension, setExtension] = useState(currFile.extension);
    const [size, setSize] = useState(currFile.size);
    const [ownerId, setOwnerId] = useState(currFile.owner.id);
    const [languages, setLanguages] = useState(currFile.languages);

    //Form state errors
    const [fileNameError, setFileNameError] = useState(errorInitialState.fileNameError);
    const [extensionError, setExtensionError] = useState(errorInitialState.extensionError);
    const [sizeError, setSizeError] = useState(errorInitialState.sizeError);
    const [langError, setLangError] = useState(errorInitialState.langError);
    const [ownerIdError, setOwnerIdError] = useState(errorInitialState.ownerIdError);

    //Page State
    const [isEdit, setIsEdit] = useState(false);

    useEffect( () => {
        retrieveLanguages();
    }, []);

    const retrieveLanguages = async () => {
        const langs = await getAllLanguages().then(resp => resp.data);
        setFullLanguageList(langs);
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    const snackCallback = (state) => {
        if (state.snackBar.variant !== "error") {
            setIsEdit(false);
        }
        enqueueSnackbar(state.snackBar.message, {variant: state.snackBar.variant});
    }

    const handleLanguageSelect = (e) => {
        const {target: { value },
            } = e;
            setLanguages(
                typeof value === 'string' ? value.split(',') : value,
            );
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        let isCorrect = true;
        setFileNameError(errorInitialState.fileNameError);
        setExtensionError(errorInitialState.extensionError);
        setSizeError(errorInitialState.sizeError);
        setLangError(errorInitialState.langError);
        setOwnerIdError(errorInitialState.ownerIdError);

        if (!fileName) {
            isCorrect = false;
            setFileNameError({isPresent: true, message: "Can not be empty"});
        }

        if (!fileName.endsWith(`.${extension}`) /*&& !fileName.endsWith(`${extension}`)*/) {
            isCorrect = false;
            setExtensionError({isPresent: true, message: "File Name must end with this extension"});
        }

        if (size < 0 || size === '') {
            isCorrect = false;
            setSizeError({isPresent: true, message: "Size should be greater or equal to zero"});
        }

        if (ownerId <= 0) {
            isCorrect = false;
            setOwnerIdError({isPresent: true, message: "Id should be greater than zero"});
        }

        if (languages.length === 0) {
            isCorrect = false;
            setLangError({isPresent: true, message: "Can not be empty"});
        }

        if (isCorrect) {
            const body = {
                id: currFile.id,
                fileName,
                extension,
                size,
                ownerId,
                languages
            }
            dispatch(updateFile(body, snackCallback));

            const currFileBody = {
                id: body.id,
                fileName: body.fileName,
                extension: body.extension,
                size: body.size,
                owner: {id: ownerId},
                languages: body.languages
            };

            setCurrFile(currFileBody);
            storage.setItem(keys.CURRENT_FILE_OBJECT, JSON.stringify(currFileBody));

        }
    }


    const handleCancel = (e) => {
        e.preventDefault();

        setFileNameError(errorInitialState.fileNameError);
        setExtensionError(errorInitialState.extensionError);
        setSizeError(errorInitialState.sizeError);
        setLangError(errorInitialState.langError);
        setOwnerIdError(errorInitialState.ownerIdError);

        setIsEdit(false);
        setFileName(currFile.fileName);
        setExtension(currFile.extension);
        setSize(currFile.size);
        setOwnerId(currFile.owner.id);
        setLanguages(currFile.languages);
    }

    return (
        <>
        <IconButton
            aria-label="GoBack"
            sx={{...style2}}
            size="large"
            onClick={handleGoBack}
        >
            <ArrowBackIcon sx={{fontSize: "30px"}}/>
        </IconButton>
        <IconButton
            aria-label="Edit"
            sx={{...style}}
            size="large"
            onClick={handleEdit}
        >
            <EditIcon sx={{fontSize: "30px"}}/>
        </IconButton>
        <Container sx={{mt: "32px"}}>
            <Paper sx={{p: "30px"}}>
                <Box sx={{display: "flex", flexDirection: "row", mb:"10px", justifyContent:"space-between"}}>
                    <Typography variant="h3">File</Typography>
                    <Typography variant="h5" color="textSecondary">ID: {currFile.id}</Typography>
                </Box>
                <form noValidate autoComplete="off">
                    <Stack gap={2}>
                        <TextField
                            onChange={e => setFileName(e.target.value)}
                            disabled={!isEdit}
                            variant="outlined"
                            label="File Name"
                            fullWidth
                            value={fileName}
                            error={fileNameError.isPresent}
                            helperText={fileNameError.message}
                        />
                        <TextField
                            disabled={!isEdit}
                            onChange={e => setExtension(e.target.value)}
                            variant="outlined"
                            label="Extension"
                            fullWidth
                            value={extension}
                            error={extensionError.isPresent}
                            helperText={extensionError.message}
                        />
                        <TextField
                            inputProps={{min: "0"}}
                            type="number"
                            disabled={!isEdit}
                            onChange={e => setSize(e.target.value)}
                            variant="outlined"
                            defaultValue={-1}
                            label="Size"
                            fullWidth
                            value={size}
                            error={sizeError.isPresent}
                            helperText={sizeError.message}
                        />
                        <TextField
                            type="number"
                            inputProps={{min: "1"}}
                            disabled={!isEdit}
                            onChange={e => setOwnerId(e.target.value)}
                            variant="outlined"
                            label="Owner Id"
                            fullWidth
                            value={ownerId}
                            error={ownerIdError.isPresent}
                            helperText={ownerIdError.message}
                        />
                        <FormControl fullWidth>
                            <InputLabel error={langError.isPresent}>Languages</InputLabel>
                            <Select
                                disabled={!isEdit}
                                multiple
                                value={languages}
                                onChange={e => handleLanguageSelect(e)}
                                input={<OutlinedInput label="Language" />}
                                error={langError.isPresent}
                            >
                                {fullLanguageList.map((l) => (
                                    <MenuItem
                                        key={l}
                                        value={l}
                                    >
                                        {l}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error={langError.isPresent}>{langError.message}</FormHelperText>
                        </FormControl>
                        <Stack direction="row" gap={5} sx={{p: "10px 40px"}}>

                            <Button
                                disabled={!isEdit}
                                type="submit"
                                variant="contained"
                                color="error"
                                sx={{flexGrow: 0.5}}
                                onClick={(e) => handleCancel(e)}
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={!isEdit}
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{flexGrow: 0.5}}
                                onClick={(e) => handleUpdate(e)}
                            >
                                Update
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>

        </Container>
        </>
    );
};

export default ViewEditFile;