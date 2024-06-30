import { useContext, useEffect, useState } from "react"
import { ICategory } from "../categories"
import { ConnectionServiceContext } from "@/context/ConnectionContext"
import { Button, Container } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from "./editModal";

export interface IProduct {
    id: string
    name: string
    description?: string
    category: ICategory
}


const Products = () => {

    const connectionService = useContext(ConnectionServiceContext)
    const [categories, setCategories] = useState<ICategory[]>([])
    const [products, setProducts] = useState<IProduct[]>([])

    const readProducts = async () => {
        const _products = await connectionService?.makeRequest<IProduct[]>('product', 'get')
        console.log({_products})
        _products && setProducts(_products)
    }

    const readCategories = async () => {
        const _categories = await connectionService?.makeRequest<ICategory[]>('category', 'get')
        _categories && setCategories(_categories)
    }

    let openEditModal: (product: IProduct) => void
    const editProduct = async (product: IProduct) => {
        try {
            await connectionService?.makeRequest<IProduct>('product/'+product.id, 'patch', JSON.stringify({...product}))
            // sockets && sockets.category.emit('refresh-categories')
        } catch (error) {
            console.log({error})
        }
    
    }

    useEffect(() => {
        readProducts()
        readCategories()
    }, [])

    const columns: GridColDef[] = [
        {field: 'category', headerName: 'Category', minWidth: 300, valueGetter: ({row}) => row.category.name },
        {field: 'name', headerName: 'Product', minWidth: 300},  
        {field: 'buttons', headerName: 'Buttons', minWidth: 200, type: 'actions',
        getActions: (product) => {
            return [
                <Button variant="outlined" onClick={() => openEditModal(product.row)}><ModeEditOutlineIcon /></Button>,
                <Button onClick={() => {}} variant="outlined"><DeleteIcon /></Button>                
            ]
        }}
    ]
    
    return <Container>
        <Button className='float-right' onClick={() => {}} variant="outlined"><AddIcon /></Button>
        <div className='flex items-center justify-center'>
            <div className='w-6/12'>
                {(!!products?.length) && <DataGrid columns={columns} rows={products} />}
            </div>
        </div>

        <EditModal categories={categories} setOpenEditModalFn={fn => openEditModal = fn} handleEdit={product => editProduct(product)}/>


    </Container>
}

export default Products