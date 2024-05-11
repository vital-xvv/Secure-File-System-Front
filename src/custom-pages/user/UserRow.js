import React, {useState} from 'react';
import {IconButton, TableCell, TableRow, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const UserRow = ({row}) => {
    const [showDelete, setShowDelete] = useState(false);
    return (
        <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
        >
            <TableCell component="th" scope="row">{row.id}</TableCell>
            <TableCell align="right">{row.firstName}</TableCell>
            <TableCell align="right">{row.lastName}</TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="center" sx={{width: "50px", height: "40px"}} >
                {
                    showDelete ?
                    <Tooltip title="Delete">
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