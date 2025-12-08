import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, SEARCH_URL } from "../../config/config";

export default function useGetFacultyProfile(id) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        // on function mount run these logic
        const getData = async () => {

            try {
                const response = await axios.get(`${BASE_URL}/${SEARCH_URL}/faculty/${id}`);
                console.log(response)
                if (!response.data) {
                    setMessage("Sorry unable to find information")
                    setLoading(false);
                    return ;
                }
                setMessage("Profile matched")
                setData(response.data);
                setLoading(false);

            } catch (err) {
                setMessage("error connecting the network");
                console.log(err)
            }
        }

        getData();

        return () => {
            console.log('cleaning up')
        }

        //todo: clean mount code here

    }, [id]);


    return {
        loading,
        message,
        data
    }
}