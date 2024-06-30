import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './editModal'
import DeleteModal from './deleteModal'
import CreateCategoryModal from './createModal';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from 'react';
import { ConnectionServiceContext } from '@/context/ConnectionContext';
import { SocketsContext } from '@/context/SocketsContext';
import { useSelector } from 'react-redux';
import { IState } from '@/store';

export interface ICategory {
    id: string
    name: string
}

const Categories = () => {

    const connectionService = useContext(ConnectionServiceContext)
    const sockets = useContext(SocketsContext)
    // const user = useSelector<IState>(state => state.user)
    const [categories, setCategories] = useState<ICategory[]>()
    const readCategories = async () => {
        const _categories = await connectionService?.makeRequest<ICategory[]>('category', 'get')
        _categories && setCategories(_categories)
    }

    useEffect(() => {
        sockets && sockets.category.connect()
        return () => {
            sockets && sockets.category.disconnect()
        }
    }, [])

    useEffect(() => {
        readCategories()
        const mappedEvent = sockets?.category.on('refresh-categories', event => {
            readCategories()
        })

        return () => {
            mappedEvent?.close()
        }   
    }, [])

    

    let openEditModal: (category: ICategory) => void
    const editCategory = async (category: ICategory) => {
        try {
            await connectionService?.makeRequest<ICategory>('category/'+category.id, 'patch', JSON.stringify({name: category.name}))
            sockets && sockets.category.emit('refresh-categories')
        } catch (error) {
            console.log({error})
        }
    
    }

    let openDeleteModal: (category: ICategory) => void
    const deleteCategory = async (category: ICategory) => {
        try {
            await connectionService?.makeRequest<ICategory>('category/'+category.id, 'delete')
            sockets?.category.emit('refresh-categories')
        } catch (error) {
            console.log({error})
        }

    }

    let openCreateModal: () => void
    const createCategory = async (name: string) => {
        try {
            await connectionService?.makeRequest<ICategory>('category', 'post', JSON.stringify({name}))
            sockets?.category.emit('refresh-categories')
        } catch (error) {
            console.log({error})
        }
    }

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Category', minWidth: 300},
        {field: 'buttons', headerName: 'Buttons', minWidth: 200, type: 'actions',
        getActions: (category) => {
            return [
                <Button variant="outlined" onClick={() => openEditModal(category.row)}><ModeEditOutlineIcon /></Button>,
                <Button onClick={() => openDeleteModal(category.row)} variant="outlined"><DeleteIcon /></Button>                
            ]
        }}
    ]

    return <Container>
        <Button className='float-right' onClick={() => openCreateModal()} variant="outlined"><AddIcon /></Button>  
        <div className='flex items-center justify-center'>
            <div className='w-6/12'>
                {(!!categories?.length) && <DataGrid columns={columns} rows={categories} />}
            </div>
        </div>
        <EditModal setOpenEditModalFn={fn => openEditModal = fn} handleEdit={category => editCategory(category)}/>
        <DeleteModal setOpenDeleteModalFn={fn => openDeleteModal = fn}  handleDelete={category => {deleteCategory(category)}}  />
        <CreateCategoryModal setOpenCreateModalFn={fn => openCreateModal = fn} handleCreate={name => createCategory(name)}  />
    </Container>
}

export default Categories