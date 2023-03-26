import React,{useState} from 'react'
import axios from 'axios'
import './Add.css'
function Add() {
  const [nomOuvrage, setNomOuvrage] = useState('');
  const [auteur, setAuteur] = useState('');
  const [numLocal, setNumLocal] = useState();
  const [numCentral, setNumCentral] = useState();
  const [type, setType] = useState('');
  const [endroit, setEndroit] = useState('');
  const [langage, setLangage] = useState('');
  const [numCopie, setNumCopie] = useState();
  const [numLocalError, setNumLocalError] = useState("");
  const [numCentralError, setNumCentralError] = useState("");
  const [nomOuvrageError, setNomOuvrageError] = useState('');
  const [auteurError, setAuteurError] = useState('');
  const [numCopieError, setNumCopieError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation here and set the error state variables accordingly
    // Check for errors
    let hasError = false;
  
    if (!nomOuvrage) {
      setNomOuvrageError('Le titre d\'ouvrage est requis');
      hasError = true;
    }
  
    if (!auteur) {
      setAuteurError('Le nom d\'auteur est requis');
      hasError = true;
    }
  
    if (!numLocal) {
      setNumLocalError('Le numéro local est requis');
      hasError = true;
    } else if (!/\d{7}/.test(numLocal)) {
      setNumLocalError('Le numéro local doit contenir 7 chiffres');
      hasError = true;
    }
  
    if (!numCentral) {
      setNumCentralError('Le numéro central est requis');
      hasError = true;
    } else if (!/\d{8}/.test(numCentral)) {
      setNumCentralError('Le numéro central doit contenir 8 chiffres');
      hasError = true;
    } 
    if (numCopie < 0) {
      setNumCopieError("Le nombre de copies doit être supérieur ou égal à 0");
      hasError = true;
    }
  
    if (!hasError) {
      try {
        const res = await axios.post('http://localhost:3001/api/ouvrage/add', {
          nomOuvrage,
          auteur,
          numLocal,
          numCentral,
          type,
          endroit,
          langage,
          numCopie
        });
        console.log(res.data);
        setNomOuvrage('')
        setAuteur('')
        setNumLocal('')
        setNumCentral('')
        setType('')
        setEndroit('')
        setLangage('')
        setNumCopie('')
      } catch (err) {
        console.log(err);
        alert('Une erreur est survenue lors de l\'enregistrement de l\'ouvrage. Veuillez réessayer plus tard.')
      }
    }
  }
  
   
      
  return (
    
    <form onSubmit={handleSubmit} className='mx-auto  mt-20 mb-10 w-96   p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 '>
    
        
    <div className='grid md:grid-cols-2 md:gap-6'>
    <div className="mb-6">
        <label htmlFor="nomOuvrage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre d'ouvrage :</label>
        <input id="nomOuvrage" type="text" value={nomOuvrage} onChange={e => setNomOuvrage(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        {nomOuvrageError && (
          <p className="text-red-500 text-xs italic">{nomOuvrageError}</p>
        )}
    </div>
    <div className="mb-6">
        <label htmlFor="auteur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'auteur :</label>
        <input id="auteur" type="text" value={auteur} onChange={e => setAuteur(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        {auteurError && (
          <p className="text-red-500 text-xs italic">{auteurError}</p>
        )}
    </div>
    </div>
 
<div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Numero Local :
    </label>
    <input
        type="number"
        value={numLocal}
        onChange={(e) => setNumLocal(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        min="0"
        pattern="\d{7}"
        required
    />
     {numLocalError && (
          <p className="text-red-500 text-xs italic">{numLocalError}</p>
        )}
</div>

<div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-gray-900 ">
        Numero Central :
    </label>
    <input
        type="number"
        value={numCentral}
        onChange={(e) => setNumCentral(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
        min="0"
        pattern="\d{8}"
        required
    />
    {numCentralError && (
          <p className="text-red-500 text-xs italic">{numCentralError}</p>
        )}
</div>



<label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-8">type d'ouvrage :</label>
<select value={type} onChange={e => setType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option defaultValue="choisire un type" disabled value="">choisire un type</option>
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
    <input onChange={e => setEndroit(e.target.value)} type="radio" value="Jeunes" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jeunes</label>
</div>
<div className="flex items-center">
    <input  onChange={e => setEndroit(e.target.value)} type="radio" value="Enfants" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
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
    <input type="number" value={numCopie} onChange={e => setNumCopie(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    {numCopieError && (
          <p className="text-red-500 text-xs italic">{numCopieError}</p>
        )}
</div>

<button type="sumbit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Ajouter</button>

    </form>
  )
}

export default Add