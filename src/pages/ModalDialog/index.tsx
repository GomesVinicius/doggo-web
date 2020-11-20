import { DialogContent, DialogContentText } from '@material-ui/core';
import React from 'react';

import './styles.css';

const ModalDialog = () => {
    return (
        <>
            {/*<DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
            <DialogActions className="btn-close">
                <FaPowerOff className="icon" onClick={() => { handleClose() }} />
            </DialogActions>*/}
            <DialogContent className="area-modal">
                <DialogContentText>
                    <table>
                        <thead>
                            <tr>
                                <th>A</th>
                                <th>N</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>C</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </DialogContentText>
            </DialogContent>
        </>
    )
}

export default ModalDialog;
