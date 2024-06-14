import { mongooseConnect } from '@/lib/mongoose';
import {Product} from "@/models/Product";
export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();


    //returns products
    if(method === 'GET') {
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        } else {
            res.json(await Product.find());
        }
        
    }
    if(method === 'POST'){
        const {title, description, price, image} = req.body;
        const productDoc = await Product.create({
            title, description, price, image,
        })
        res.json(productDoc);
    }

    if(method === 'PUT'){
        const {title, description, price, image, _id} = req.body;
        //we can just use {_id} instead of {_id:_id} since they are same name
        //same with title, desc, price,
        //if they had diff var names then we have to do {title : newTitle} if newTitle was our var
        await Product.updateOne({_id}, {title, description, price, image});
        res.json(true);
    }

    if(method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
  }