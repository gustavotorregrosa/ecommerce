import { Box, Button, Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';

interface AlertModalProps {
    setOpenFn: (fn: () => void) => void
}

export const AlertModal = ({setOpenFn}: AlertModalProps) => {

    const [message, setMessage] = useState<string>()
    const [open, setOpen] =  useState<boolean>(false)

    const openModal = () => {
        setMessage(undefined)
        setOpen(true)
    }

    setOpenFn && setOpenFn(openModal)
    
    return <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
            <Input value={message} onChange={e => { setMessage(e.target.value) }} />&nbsp;&nbsp;
            <br/><br/>
            <Button onClick={() => {}} variant="outlined" >Broadcast message</Button>
        </Box>
    </Modal>
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    p: 4,
  };

