import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm({
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice,
    _id,
    }){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goProducts, setGoProducts] = useState(false);
    const router = useRouter();

    async function saveProduct(event){
        event.preventDefault();
        const data = {title, description, price}
        if(_id){
            await axios.put('/api/products', {...data, _id});
        } else {
            await axios.post('/api/products', data);
        }
        setGoProducts(true);    
    }

    //runs each time setgoProducts is called because useStates rerender the component
    if(goProducts){
        router.push('/products');
    }
    return (
        <form onSubmit={saveProduct}>
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
    );
} 