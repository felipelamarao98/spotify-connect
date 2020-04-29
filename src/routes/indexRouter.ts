import express from "express";
import { methods, routerAttr, routerBuilder } from './routerBuilder';
import axios from "axios";

const routes: routerAttr [] = [
    {
        method: methods.GET,
        path:"/",
        fn: (__: express.Request, res: express.Response) =>{
            res.status(200).send({message:"test"});
        }
    },
    {
        method:methods.GET,
        path:"/login",
        fn: (__:express.Request, res: express.Response) =>{
            let scopes = 'user-read-private user-read-email'
            let redirect_uri = 'http://localhost:3000/callback'
            res.redirect('https://accounts.spotify.com/authorize'+
            '?response_type=code'+
            '&client_id='+'a26113cf34f94f04a73bc181d2a0b3aa'+
            (scopes?'&scope=' + encodeURIComponent(scopes): '')+
            '&redirect_uri='+encodeURIComponent(redirect_uri))
        }
    },
    {
        method: methods.GET,
        path:"/callback",
        fn: (req: express.Request,res:express.Response) =>{
            console.log(req.query);
            console.log('**************');
            console.log(req.body);
            res.status(200).send(req.query);
        }
    },
    {
        method: methods.GET,
        path:"/current-track",
        fn: async (req: express.Request, res: express.Response)=>{
            const code = req.query.code
            const resp = await axios.get('	https://api.spotify.com/v1/me/player',{
                headers:{
                    'Authorization':'Bearer '+code,
                    'market':'BR',
                    'additional_types':'track'
                }
            })
            .then((response)=>{
                return response.data;
            })
            .catch((err:any)=>console.log(err))

            const objectResponse ={
                'dispositivo':{
                    'nome':resp.device.name,
                    'tipo':resp.device.type,
                    'volume':resp.device.volume_percent
                }
            }
            res.status(200).send({data:objectResponse});
        }

    }
]

export default routerBuilder(routes);