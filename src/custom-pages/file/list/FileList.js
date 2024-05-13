import React, {useEffect, useState} from 'react';
import {
    Container, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import {useDispatch, useSelector} from "react-redux";
import FileTableRow from "./FileTableRow";
import {fetchPage} from "../../../app/actions/fileActionCreators";
import ConfirmModal from "../modal/ConfirmModal";
import FilterModal from "../modal/FilterModal";
import storage, {keys} from "../../../misc/storage";

const columnNames =
    [
        {id: "id", name: "ID"},
        {id: "fileName", name: "File Name"},
        {id: "size", name: "Size"},
        {id: "extension", name: "Extension"},
        {id: "languages", name: "Languages"},
        {id: "ownerId", name: "Owner ID"},
    ];


const FileList = () => {
    const files = useSelector(state => state.files);
    const dispatch = useDispatch();

    const[page, setPage] = useState(files.page);
    const[size, setSize] = useState(files.size);
    const[openModal, setOpenModal] = useState(false);
    const[openFilterModal, setOpenFilterModal] = useState(false);

    useEffect(() => {
        const body = storage.getItem(keys.PAGINATION_FILTER_OBJECT);
        if(body) {
            const parsed = JSON.parse(body);
            setPage(parsed.page);
            setSize(parsed.size);
            dispatch(fetchPage(parsed));
        }else{
            dispatch(fetchPage());
        }
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const body = {
            page: newPage,
            size: files.size,
            extension: files.extension,
            ownerId: files.ownerId}
        storage.setItem(keys.PAGINATION_FILTER_OBJECT, JSON.stringify(body));
        dispatch(fetchPage(body))
    }

    const handleChangeRowsPerPage = (event) => {
        setSize(event.target.value);
        const body = {
            page: files.page,
            size: event.target.value,
            extension: files.extension,
            ownerId: files.ownerId
        }
        storage.setItem(keys.PAGINATION_FILTER_OBJECT, JSON.stringify(body));
        dispatch(fetchPage(body))
    }

    return (
        <Container sx={{marginTop: "16px"}}>
            {console.log(files)}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead sx={{backgroundColor: "#1c1919"}}>
                            <TableRow>
                                {
                                    columnNames.map(col => (
                                        <TableCell
                                            sx={{color: "white", fontWeight: "bold", fontSize: "18px"}}
                                            key={col.id}
                                        >
                                            {col.name}
                                        </TableCell>
                                    ))
                                }
                                <TableCell align="center" sx={{color: "white", fontWeight: "bold", fontSize: "18px"}}>
                                    <IconButton onClick={() => setOpenFilterModal(true)} aria-label="Filter">
                                        <FilterListIcon sx={{color: "white"}} size="large"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {
                                files.list.map(file => (
                                    <FileTableRow openModal={openModal} setOpenModal={setOpenModal} file={file}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5,10,15]}
                    page={page}
                    rowsPerPage={size}
                    count={files.totalElements}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ConfirmModal open={openModal} setOpen={setOpenModal}/>
            <FilterModal open={openFilterModal} setOpen={setOpenFilterModal}/>
        </Container>
    );
};

export default FileList;