import React, {useEffect, useState} from 'react';
import {
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import UserRow from "./UserRow";
import {useSelector, useDispatch} from "react-redux";
import * as userListActions from '../../app/actions/userListActionCreators';
import ConfirmModal from "./modal/ConfirmModal";



const UserList = () => {
    const userList = useSelector(state => state.userList)
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(0);

    useEffect(() => {
        dispatch(userListActions.fetchUsers())
    }, []);

    return (
        <>
            <Container maxWidth={"lg"} sx={{marginTop: "16px"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{backgroundColor: "#2BC4F9"}}>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((user) => (
                                <UserRow setId={setCurrentUserId} open={open} setOpen={setOpen} user={user}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <ConfirmModal open={open} setOpen={setOpen} userId={currentUserId}/>
        </>
    );
};

export default UserList;