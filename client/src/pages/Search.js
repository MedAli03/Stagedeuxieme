import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './Search.css'
import { BsTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';


function Search() {

    const [books, setBooks] = useState([]);
    
    const [nomOuvrage, setNomOuvrage] = useState('');
    const [auteur, setAuteur] = useState('');
    const [numLocal, setNumLocal] = useState();
    const [numCentral, setNumCentral] = useState();
    const [type, setType] = useState('');
    const [endroit, setEndroit] = useState('');
    const [langage, setLangage] = useState('');
    const [numCopie, setNumCopie] = useState();


    const [bookId, setBookId] = useState();

    // const [state, setState] = useState({
    //   nomOuvrage: '',
    //   auteur: '',
    //   numLocal: '',
    //   numCentral: '',
    //   type: '',
    //   endroit: '',
    //   langage: '',
    //   numCopie: ''
    // });

    const [showModal, setShowModal] = useState(false);

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

  
    
    const handleDelete =  (id) => {
        try{
             axios.delete(`http://localhost:3001/api/ouvrage/delete/${id}`).then(() =>{
            setBooks(
                books.filter((item) => {
                    return item._id !== id;
                })
            )
        })
        }catch(error){
            console.error(error)
        }
        
    }

    const getOuvrageById = async (id) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/ouvrage/getouvrage/${id}`);
          setNomOuvrage(response.data.nomOuvrage);
          setAuteur(response.data.auteur);
          setNumLocal(response.data.numLocal);
          setNumCentral(response.data.numCentral);
          setType(response.data.type);
          setEndroit(response.data.endroit);
          setLangage(response.data.langage);
          setNumCopie(response.data.numCopie);

          setBookId(response.data._id)
          setShowModal(true);
        } catch (error) {
          console.error(error);
        }
      }
      
  

    

    const handleSubmit = (e) => {
       e.preventDefault();
        try{
          axios.put(`http://localhost:3001/api/ouvrage/update/${bookId}`, {
            nomOuvrage,
            auteur,
            numLocal,
            numCentral,
            type,
            endroit,
            langage,
            numCopie
        }
        )
          .then((res) => {
            console.log(res);
            console.log(res.data);
            
              setNomOuvrage('')
              setAuteur('')    
              setNumLocal('')
              setNumCentral('')
              setType('')
              setEndroit('')
              setLangage('')
              setNumCopie('')

              setShowModal(false);
              window.location.reload();
          })
        }catch(error) {
            console.log(error);
          };
        
          
      };

   

    //   const handleOpenModal = () => {
    //     setShowModal(true);
    //   };
    
    //   const handleCloseModal = () => {
    //     setShowModal(false);
    //   };


  return (
    
<>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full w-full  ">
    <div className="flex items-center  pb-4 mt-3">
        <div className='mx-4'>

            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option  disabled defaultValue >Chercher par </option>
            <option value="ouvrage">NOM D'OUVRAGE</option>
            <option value="auteur">NOM D'AUTEUR</option>
            <option value="numLocal">NUMERO LOCAL</option>
            </select>

        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search htmlFor items"/>
        </div>
    </div>
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={book._id}>
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
                <div>
                    <button type="button" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" onClick={() => { getOuvrageById(book._id);}} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  focus:outline-none focus:ring-teal-300  shadow-lg shadow-teal-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><AiFillEdit /></button>
                    
                     {showModal ? (
                     
                     <>
                     <div
                       className="justify-center items-center flex  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                     >
                       <div className="relative w-auto my-6 mx-auto max-w-3xl">
                         {/*content*/}
                         <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                           {/*header*/}
                           <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                             <h3 className="text-3xl font-semibold">
                               Modifier Ouvrage
                             </h3>
                             <button
                               className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                               onClick={() => setShowModal(false)}
                             >
                               <span className="bg-red-700 text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                 X
                               </span>
                             </button>
                           </div>
                           {/*body*/}
                           <div className=" p-6  ">
                           <form  className='w-96  mt-24   '>
    
        
                                <div className='w-full flex justify-between'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre d'ouvrage :</label>
                                    <input type="text"  value={nomOuvrage} onChange={e => setNomOuvrage(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'auteur :</label>
                                    <input type="text"  value={auteur} onChange={e => setAuteur(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                </div>  
                                <div className='flex justify-between'>
                                      <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero Local :</label>
                                    <input type="number"  value={numLocal} onChange={e => setNumLocal(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                
                                <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero Central :</label>
                                    <input type="number"  value={numCentral} onChange={e => setNumCentral(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                </div> 
                              
                                
                                
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-8">type d'ouvrage :</label>
                                <select   value={type} onChange={e => setType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue={book.type} disabled value="">choisire un type</option>
                                <option value="généraux">généraux</option>
                                <option value="philosophie">philosophie</option>
                                <option value="religieux">religieux</option>
                                <option value="sciences politiques et sociales">sciences politiques et sociales</option>
                                
                                <option value="langue">langue</option>
                                <option value="scientifiques vivants">scientifiques vivants</option>
                                <option value="science">science</option>
                                <option value="art">art</option>
                                
                                <option value="littérature">littérature</option>
                                <option value="théâtre">théâtre</option>
                                <option value="Histoire">Histoire</option>
                                <option value="traduction">traduction</option>
                                <option value="récit">récit</option>
                                </select>
                                
                                        
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-8">L'endroit :</label>
                                <div className="flex items-center mb-4 ">
                                    <input onChange={e =>  setEndroit(e.target.value)} type="radio" value="Jeunes" checked={endroit === "Jeunes"} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jeunes</label>
                                </div>
                                <div className="flex items-center">
                                    <input  onChange={e => setEndroit(e.target.value)} type="radio" value="Enfants" checked={endroit === "Enfants"}  name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enfants</label>
                                </div>
                                
                                
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-8">Langue :</label>
                                <select value={langage} onChange={e => setLangage(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue="choisire une langue" disabled value="">choisire une langue</option>
                                <option value="Arabe">Arabe</option>
                                <option value="Français">Français</option>
                                <option value="Anglais">Anglais</option>
                                <option value="Other">Other</option>
                                </select>
                                
                                <div className="mb-6">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de copies :</label>
                                    <input type="number"  value={numCopie} onChange={e => setNumCopie(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                
                               
                                
                            </form>
                          
                           </div>
                           {/*footer*/}
                           <div className="flex items-center justify-end  p-6  ">
                             <button
                               className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                               type="button"
                               onClick={() => setShowModal(false)}
                             >
                               Close
                             </button>
                             <button
                               className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              //  type="sumbit"

                               onClick={(e) => handleSubmit(e)}
                               
                             >
                               Save Changes
                             </button>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                 
                 
               </>

                     
                     ) 
                     
                     : null} 
                                
                                        
                                    
                </div>
                <button type="button" id={book._id} onClick={() => handleDelete(book._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><BsTrashFill /> </button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
</div>
</>
  )
}

export default Search