import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from './editModal'
import DeleeteModal from './deleteModal'
import Head from 'next/head';
import { useEffect } from 'react';
import { useAuth } from '@/providers/authProvider';

export interface ICategory {
    id: string
    name: string
}

const Categories = () => {

    const auth = useAuth()
    // useEffect(() => {
    //     console.log(auth.showUser())
    // }, [])

    useEffect(() => {
        setTimeout(() => {
            auth.login({
                id: '1234',
                email: 'felipe.torregrosa@gmail.com',
                name: 'felipe torregrosa',
                access_token: 'felipe 23456',
                access_refresh_token: 'felipe 098765'
            })
        }, 10000)
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