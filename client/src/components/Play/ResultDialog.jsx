import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultDialog({ open, handleClose }) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Game Over</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <div className='w-full h-32 flex flex-col justify-center items-center gap-4'>
                        <span className='text-xl font-semibold text-center '> White won</span>
                        <span className='text-lg text-center '>by checkmate</span>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose} className='bg-border p-2 rounded-lg m-2 w-full h-16'>Go Home</button>
                <button onClick={handleClose} className='bg-border p-2 rounded-lg m-2 w-full h-16'>New Game</button>
            </DialogActions>
        </Dialog>
    );
}