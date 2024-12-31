export {removetv} from '../reducers/tvSlice'
import axios from '../../utils/axios'
import { loadtv, tvSlice } from '../reducers/tvSlice';

export const asynccloadtv = (id) => async (dispatch, getState) => {
    try{
        const details = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        let theultimatedetails = {
            details: details.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
        }


        dispatch(loadtv(theultimatedetails))
        console.log(theultimatedetails);
        
        
    }catch(err){
        console.log("err: ",err);
        
    }
};