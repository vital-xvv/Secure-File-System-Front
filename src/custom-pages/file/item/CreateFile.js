import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import {getAllLanguages} from '../../../app/api/fileApi';
import {useSnackbar} from "notistack";
import {createNewFile} from "../../../app/actions/fileActionCreators";


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


const CreateFile = () => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fullLanguageList, setFullLanguageList] = useState([]);

    //From state
    const [fileName, setFileName] = useState("");
    const [extension, setExtension] = useState("");
    const [size, setSize] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [languages, setLanguages] = useState([]);

    //Form state errors
    const [fileNameError, setFileNameError] = useState(errorInitialState.fileNameError);
    const [extensionError, setExtensionError] = useState(errorInitialState.extensionError);
    const [sizeError, setSizeError] = useState(errorInitialState.sizeError);
    const [langError, setLangError] = useState(errorInitialState.langError);
    const [ownerIdError, setOwnerIdError] = useState(errorInitialState.ownerIdError);


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

    const handleLanguageSelect = (e) => {
        const {target: { value },
        } = e;
        setLanguages(
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    const handleCreate = (e) => {
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

        if (!fileName.endsWith(`.${extension}`)) {
            isCorrect = false;
            setExtensionError({isPresent: true, message: "File Name must end with this extension"});
        }

        if (size < 0 || size === '') {
            isCorrect = false;
            setSizeError({isPresent: true, message: "Size should be greater or equal to zero"});
        }

        if (ownerId <= 0 || ownerId === '') {
            isCorrect = false;
            setOwnerIdError({isPresent: true, message: "Id should be greater than zero"});
        }

        if (languages.length === 0) {
            isCorrect = false;
            setLangError({isPresent: true, message: "Can not be empty"});
        }

        if (isCorrect) {
            const body = {
                fileName,
                extension,
                size,
                ownerId,
                languages
            }
            dispatch(createNewFile(body, callback))
        }
    }

    const callback = (state) => {
        enqueueSnackbar(state.snackBar.message, {variant: state.snackBar.variant});
        if(state.snackBar.variant === "success")
            handleCancel();
    }


    const handleCancel = (e) => {
        if(e)
            e.preventDefault();

        setFileNameError(errorInitialState.fileNameError);
        setExtensionError(errorInitialState.extensionError);
        setSizeError(errorInitialState.sizeError);
        setLangError(errorInitialState.langError);
        setOwnerIdError(errorInitialState.ownerIdError);

        setFileName("");
        setExtension("");
        setSize('');
        setOwnerId('');
        setLanguages([]);
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
            <Container sx={{mt: "32px"}}>
                <Paper sx={{p: "30px"}}>
                    <Box sx={{display: "flex", flexDirection: "row", mb:"10px", justifyContent:"space-between"}}>
                        <Typography variant="h3">Create a new file</Typography>
                    </Box>
                    <form noValidate autoComplete="off">
                        <Stack gap={2}>
                            <TextField
                                onChange={e => setFileName(e.target.value)}
                                variant="outlined"
                                label="File Name"
                                fullWidth
                                value={fileName}
                                error={fileNameError.isPresent}
                                helperText={fileNameError.message}
                            />
                            <TextField
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
                                    type="submit"
                                    variant="contained"
                                    color="error"
                                    sx={{flexGrow: 0.5}}
                                    onClick={(e) => handleCancel(e)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    sx={{flexGrow: 0.5}}
                                    onClick={(e) => handleCreate(e)}
                                >
                                    Create
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default CreateFile;