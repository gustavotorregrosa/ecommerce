import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './editModal'
import DeleeteModal from './deleteModal'
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { IState } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {login, logout} from '@/store/user/user.slice'

export interface ICategory {
    id: string
    name: string
}

const Categories = () => {

    // const user = useSelector<IState>(state => state.user)

    // let myInterval: NodeJS.Timeout
    // useEffect(() => {
    //     clearInterval(myInterval)

    //     myInterval = setInterval(() => {
    //         console.log({user})
    //     }, 5000)
    // }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(login({
              id: 'gustavo',
              email: 'gustavo 2',
              access_refresh_token: 'guga',
              access_token: 'test 123',
              name: 'gusta'
            
            }))
        }, 5000);
    
      }, [])

    const categories: ICategory[] = [
        {
            id: '1',
            name: 'Esporte',
        },
        {
            id: '2',
            name: 'Culinária'
        }
    ]

    let openEditModal: (category: ICategory) => void
    const editCategory = (category: ICategory) => console.log({category})

    let openDeleteModal: (category: ICategory) => void
    const deleteCategory = (category: ICategory) => console.log({category})

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Category', minWidth: 300},
        {field: 'buttons', headerName: 'Buttons', minWidth: 200, type: 'actions',
        getActions: (category) => {
            return [
                <Button onClick={() => openEditModal(category.row)} variant="outlined"><ModeEditOutlineIcon /></Button>,
                <Button onClick={() => openDeleteModal(category.row)} variant="outlined"><DeleteIcon /></Button>
                
            ]
        }}
    ]

    return <Container>
        <div className='flex items-center justify-center'>
            <div className='w-6/12'>
                <DataGrid columns={columns} rows={categories} />
            </div>
        </div>
        <EditModal setOpenEditModalFn={fn => openEditModal = fn} handleEdit={category => editCategory(category)}/>
        <DeleeteModal handleDelete={category => {deleteCategory(category)}} setOpenDeleteModalFn={fn => openDeleteModal = fn} />
    </Container>
}

export default Categories