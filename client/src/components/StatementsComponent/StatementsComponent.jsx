import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from "moment"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";


// Recoil
import { useRecoilValue } from 'recoil';
import { responseUserIDState } from '../../Store/Atoms'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        marginTop: '3vh'
    },
});

export default function StatementsTable() {
    const classes = useStyles();

    const responseUserID = useRecoilValue(responseUserIDState);

    const [data, setData] = useState([{}]);
    
    const [page, setPage] = React.useState(0);
    
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };

     const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(+event.target.value);
       setPage(0);
     };

    useEffect(() => {
        if (!responseUserID) {
            return;
        } else {
            axios.post(`http://localhost:4000/statements`, {
                account_ID: responseUserID
            }).then(({ data }) => {
                setData(data.statements.rows);
            })
        }
    }, [setData, responseUserID]);

    

    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Statement Table">
            <TableHead>
              <TableRow key={Math.random().toString(36).substr(2, 9)}>
                <TableCell>Transaction ID</TableCell>
                <TableCell align="right">Transaction Date</TableCell>
                <TableCell align="right">Reciever</TableCell>
                <TableCell align="right">Amount&nbsp;(USD)</TableCell>
                <TableCell align="right">Memo</TableCell>
                <TableCell align="right">Transaction Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((statement) => {
                return (
                  <TableRow key={Math.random().toString(36).substr(2, 9)}>
                    <TableCell>{statement.transaction_id}</TableCell>
                    <TableCell align="right">
                      {moment(statement.date).format("MMM Do YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      {statement.reciever_username}
                    </TableCell>
                    <TableCell align="right">
                      {"$" + statement.amount}
                    </TableCell>
                    <TableCell align="right">
                      {statement.memo === null ? "N/A" : statement.memo}
                    </TableCell>
                    <TableCell align="right">
                      {statement.status_description}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1,5,10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    );
}