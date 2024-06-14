import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm({
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice,
    _id,
    image:existingImage,
    }){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goProducts, setGoProducts] = useState(false);
    const [image, setImage] = useState(existingImage || []);
    const router = useRouter();

    async function saveProduct(event){
        event.preventDefault();
        const data = {title, description, price, image}
        if(_id){
            await axios.put('/api/products', {...data, _id});
        } else {
            await axios.post('/api/products', data);
        }
        setGoProducts(true);    
    }

    async function uploadImage(event){
        const file = event.target?.files;
        if(file?.length > 0){
            const data = new FormData();
            for (const f of file) {
                data.append('file', f);
            }
            const res = await axios.post('/api/upload', data);
            setImage(res.data.links);
        }
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
            <label>
                Photo
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!image?.length && image.map(link => (
                    <div key = {link} className="h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
                <label className="w-24 h-24 text-center flex items-center 
                justify-center text-sm gap-1 text-gray-500 
                rounded-lg bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImage} className="hidden"/>
                </label>
            </div>
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