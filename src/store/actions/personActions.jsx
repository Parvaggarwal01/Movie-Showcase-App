export {removeperson} from '../reducers/personSlice'
import axios from '../../utils/axios'
import {loadperson} from '../reducers/personSlice'

export const asynccloadperson = (id) => async (dispatch, getState) => {
    try{
        const details = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
        let theultimatedetails = {
            details: details.data,
            externalid: externalid.data,
            combinedCredits: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data,
        }


        dispatch(loadperson(theultimatedetails))
        console.log(theultimatedetails);
        
        
    }catch(err){
        console.log("err: ",err);
        
    }
};