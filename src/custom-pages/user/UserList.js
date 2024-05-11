import React, {useEffect} from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import UserRow from "./UserRow";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import * as userListActions from '../../app/actions/userListActionCreators';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/user'
})

const UserList = () => {
    const userList = useSelector(state => state.userList)
    const dispatch = useDispatch();

    useEffect(() => {
        api.get("").then(response =>
            dispatch(userListActions.populateList(response.data))
        )
    }, []);

    return (
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
                    {userList.map((row) => (
                        <UserRow row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
};

export default UserList;