import React from 'react';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        marginBottom: "-3.5px",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        "&:hover svg": {
            color: "#fff",
            transform: "scale(1.3)"
        }
    },
    boxContent: {
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "rgba(0, 0, 0, 0.5)",
        letterSpacing: "1px",
        fontSize: "12px",
        textTransform: "uppercase"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};

const DraggableColorBox = SortableElement((props) => {
    const {classes, name, color, handleClick} = props;
    return(
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
});

export default withStyles(styles)(DraggableColorBox);