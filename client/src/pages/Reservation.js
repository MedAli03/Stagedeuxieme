import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import './Reservation.css'
function Reservation() {

    // const [reservation,setReservation] = useState('');
    // const [userID, setUserID] = useState('');
    // const [ouvrageID, setOuvrageID] = useState('');
    const [books, setBooks] = useState([]);
    
    useEffect(() => { 
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:3001/api/ouvrage/getall');
            setBooks(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);

   
    // const handleClick = () => {
    //     axios.post('http://localhost:3001/api/emprunte/create', { userID : user._id, ouvrageID : books._id})
    //         .then(res => {
    //             if (res.data.message === 'User not found') {
    //                 console.error('User not found');
    //             } else if (res.data.message === 'Ouvrage not found') {
    //                 console.error('Ouvrage not found');
    //             } else {
    //                 console.log(res.data);
    //             }
    //         })
    //         .catch(err => console.error(err));
    // };

  return (
    <div>
        
<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    
                </th>
                <th scope="col" className="px-6 py-3">
                    Nom d'ouvrage
                </th>
                <th scope="col" className="px-6 py-3">
                    Nom d'auteur
                </th>
                <th scope="col" className="px-6 py-3">
                    Numero Local
                </th>
                <th scope="col" className="px-6 py-3">
                    Numero Central
                </th>
                <th scope="col" className="px-6 py-3">
                    type d'ouvrage
                </th>
                <th scope="col" className="px-6 py-3">
                    L'endroit
                </th>
                <th scope="col" className="px-6 py-3">
                    Langue
                </th>
                <th scope="col" className="px-6 py-3">
                    Nombre de copies
                </th>
                <th scope="col" className="px-auto py-auto text-center">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {books.map(book => (
            <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {book.nomOuvrage} 
                </th>
                <td className="px-6 py-4">
                    {book.auteur} 
                </td>
                <td className="px-6 py-4">
                    {book.numLocal} 
                </td>
                <td className="px-6 py-4">
                    {book.numCentral} 
                </td>
                <td className="px-6 py-4">
                    {book.type} 
                </td>
                <td className="px-6 py-4">
                    {book.langage} 
                </td>
                <td className="px-6 py-4">
                    {book.endroit} 
                </td>
                <td className="px-6 py-4">
                    {book.numCopie} 
                </td>
                <td className="flex  px-6 py-4">
                <button type="button"   className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reserver</button>
               
                </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  )
}

export default Reservation