import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { columns } from '../staticData/columns';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'

const StyledTableRow = withStyles({
  root: {
    background: 'white',
    borderRadius: 20,
    border: '1px solid rgba(224, 224, 224, 1)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px  rgba(224, 224, 224, 1)',
  },

})(TableRow);
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
    overflow: 'visible'
  },
});

export default function locationList({ setState, deleteLoc, state }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.locations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            return (
              <StyledTableRow style={{ backgroundColor: 'white', border: '10px solid light-grey' }} hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
                <TableCell key={`button-${row.id}`} align='right'>
                  <Link to={`/addAddress/${row.id}`}><EditIcon onClick={() => { alert('save' + row.id) }} /></Link>
                  <DeleteIcon onClick={() => deleteLoc(row.id)} />
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        style={{ display: 'inline-flex' }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.locations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>)

}


