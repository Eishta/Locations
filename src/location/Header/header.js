import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        boxShadow: 'none',
        backgroundColor: 'rgba(224, 224, 224, 0.31)'
    },
    title: {
        flexGrow: 1,
        boxShadow: 'none',
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "white", color: 'black', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Locations
                    </Typography>
                    <Link to='/addAddress' style={{textDecoration: 'none'}}> <Button variant="contained" color="primary" style={{ textAlignLast: 'end', borderRadius: '25%' }}>
                        +Add Locations
                     </Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>
    );
}
