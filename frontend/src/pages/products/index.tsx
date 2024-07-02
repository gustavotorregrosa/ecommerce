import { useContext, useEffect, useState } from "react"
import { ICategory } from "../categories"
import { ConnectionServiceContext } from "@/context/ConnectionContext"
import { Button, Container } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from "./editModal";
import CreateProductModal from "./createModal";
import DeleteProductModal from "./deleteModal";
import { SocketsContext } from "@/context/SocketsContext";

export interface IProduct {
    id?: string
    name: string
    description?: string
    category: ICategory
}


const Products = () => {

    const connectionService = useContext(ConnectionServiceContext)
    const [categories, setCategories] = useState<ICategory[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const sockets = useContext(SocketsContext)
    useEffect(() => {
        sockets && sockets.category.connect()
        sockets && sockets.product.connect()
        return () => {
            sockets && sockets.category.disconnect()
            sockets && sockets.product.disconnect()
        }
    }, [])

    useEffect(() => {
        readCategories()
        readProducts()
        const mappedCategoriesEvent = sockets?.category.on('refresh-categories', event => {
            readCategories()
        })

        const mappedProductsEvent = sockets?.product.on('refresh-products', event => {
            readProducts()
        })

        return () => {
            mappedCategoriesEvent?.close()
            mappedProductsEvent?.close()
        }   
    }, [])

    const readProducts = async () => {
        const _products = await connectionService?.makeRequest<IProduct[]>('product', 'get')
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
            sockets && sockets.product.emit('refresh-products')
        } catch (error) {
            console.log({error})
        }
    }

    let openCreateModal: () => void
    const createProduct = async (product: IProduct) => {
        try {
            await connectionService?.makeRequest<IProduct>('product', 'post', JSON.stringify({...product}))
            sockets && sockets.product.emit('refresh-products')
        } catch (error) {
            console.log({error})
        }
    }

    let openDeleteModal: (product: IProduct) => void
    const deleteProduct = async (product: IProduct) => {
        try {
            await connectionService?.makeRequest<ICategory>('product/'+product.id, 'delete')
            sockets && sockets.product.emit('refresh-products')
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
                <Button onClick={() => openDeleteModal(product.row)}  variant="outlined"><DeleteIcon /></Button>                
            ]
        }}
    ]
    
    return <Container>
        <Button className='float-right'  onClick={() => openCreateModal()} variant="outlined"><AddIcon /></Button>
        <div className='flex items-center justify-center'>
            <div className='w-8/12 md:w-12/12'>
                {(!!products?.length) && <DataGrid columns={columns} rows={products} />}
            </div>
        </div>
        <DeleteProductModal setOpenDeleteModalFn={fn => openDeleteModal = fn}  handleDelete={product => {deleteProduct(product)}}  />
        <EditModal categories={categories} setOpenEditModalFn={fn => openEditModal = fn} handleEdit={product => editProduct(product)}/>
        <CreateProductModal categories={categories} setOpenCreateModalFn={fn => openCreateModal = fn} handleCreate={product => createProduct(product)}  />


    </Container>
}

export default Products