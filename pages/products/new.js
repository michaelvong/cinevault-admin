import Layout from "@/components/layout"
import {useState} from "react"
import axios from "axios"
import {useRouter} from "next/router"
export default function NewProduct(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goProducts, setGoProducts] = useState(false);
    const router = useRouter();
    async function createProduct(event){
        event.preventDefault();
        const data = {title, description, price};
        await axios.post('/api/products', data);
        setGoProducts(true);
    }
    if(goProducts){
        router.push('/products');
    }
    return (
        <Layout>
            <form onSubmit={createProduct}>
                <h1>New Product</h1>
                <label>Product Name</label>
                <input 
                    type='text' 
                    placeholder="Movie Name" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea 
                    placeholder="description"
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                <label>Price</label>
                <input
                    type='text' 
                    placeholder="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type="submit" className="btn-primary">Submit</button>
            </form>
            
        </Layout>  
    );
}