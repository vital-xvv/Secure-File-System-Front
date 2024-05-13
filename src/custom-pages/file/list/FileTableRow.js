import {IconButton, TableCell, TableRow} from "@mui/material";
import { v4 as uuid } from 'uuid';
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../css/deleteButton.css";
import {useDispatch} from "react-redux";
import {currentFile} from "../../../app/actions/fileActionCreators";
import { useNavigate } from "react-router-dom";
import pagesURLs from '../../../constants/pagesURLs';
import * as pages from 'constants/pages';
import storage, {keys} from "../../../misc/storage";

const FileTableRow = ({openModal, setOpenModal, file}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpenModal(!openModal);
        dispatch(currentFile(file.id));
    }

    const handleView = () => {
        storage.setItem(keys.CURRENT_FILE_OBJECT, JSON.stringify(file));
        navigate(`${pagesURLs[pages.filesPage]}/${file.id}`);
        dispatch(currentFile(file.id));
    }

    return (
        <TableRow className="row">
            <TableCell key={uuid()}>{file.id}</TableCell>
            <TableCell key={uuid()}>{file.fileName}</TableCell>
            <TableCell key={uuid()}>{file.size}</TableCell>
            <TableCell key={uuid()}>{file.extension}</TableCell>
            <TableCell key={uuid()}>{file.languages.toString()}</TableCell>
            <TableCell key={uuid()}>{file.owner.id}</TableCell>
            <TableCell align="center" key={uuid()}>
                    <IconButton
                        aria-label="Filter"
                        sx={{margin: 0, padding: "4px"}}
                        onClick={handleClick}
                    >
                        <DeleteIcon id="delBut" size="small" />
                    </IconButton>
                    <IconButton
                        aria-label="Review"
                        sx={{margin: 0, padding: "4px"}}
                        onClick={handleView}
                    >
                        <VisibilityIcon id="viewBut" size="small" />
                    </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default FileTableRow;