import React, {useState} from 'react';
import {IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const UserRow = ({open, setOpen, user, setId}) => {
    const [showDelete, setShowDelete] = useState(false);

    const openModal = () => {
        setOpen(!open);
        setId(user.id);
    }

    return (
        <TableRow
            key={user.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            <TableCell component="th" scope="row">{user.id}</TableCell>
            <TableCell align="right">{user.firstName}</TableCell>
            <TableCell align="right">{user.lastName}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="center" sx={{width: "50px", height: "40px"}} >
                {
                    showDelete ?
                    <Tooltip title="Delete" onClick={openModal} >
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                        : <></>
                }
            </TableCell>
        </TableRow>
    );
};

export default UserRow;