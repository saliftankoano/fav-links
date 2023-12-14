import { React, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tableData, setTableData]= useState([]);

  const [formData, setFormData]= useState({
    linkName: 'Salif',
    linkURL: 'https://saliftankoano.com'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getLinks = async () => {
    try {
      // make a request to our server to get the links
      const response = await fetch('/api/links')
      // convert the response to json
      const data = await response.json()
      // Use the data
      setTableData(data);
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getLinks()
  }, [])

  const handleForm = (e) => {
    e.preventDefault();
    // Through our server send Link --> Database
    const postLink = async ()=>{
      let link = {name: formData.linkName, url: formData.linkURL};

      try {
        console.log(formData);
        let response = await fetch('/api/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(link)
        });
        let message = response.text();
        console.log(message);
        // After Link was successfully added Get all the links in the database
        getLinks();
      } catch (error) {
        console.log(error)
      }
    }
    postLink();
    
    // Add the new row to the tableData state
    setTableData((prevData) => [...prevData, formData]);

    // Clear the form after submission
    setFormData({
      linkName: '',
      linkURL: '',
      // Reset other form fields as needed
    });

  };

  const handleDeleteRow = (index) =>{
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  }

  
  

 

  return (
    <div id='all'>
      <h1>My Favorite Links</h1>
      <p>Add a new URL and Name to the table</p>
      <table>
        <thead>
            <tr id='tb-header'>
                <th>Name</th>
                <th>URL</th>
                <th id='deleteCol'>Delete</th>
            </tr>
        </thead>
        <tbody>
          {tableData.map( tableData => (
            <tr key={tableData.id}>
              <td id='linkName'>{tableData.name}</td>
              <td id='linkUrl'><a  href={tableData.url}>{tableData.url}</a></td>
              <td id='deleteCol'><button onClick={()=> handleDeleteRow(tableData.id)} id='btn'>Delete</button></td>
              {/* Add other table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add new</h1>
      <form onSubmit={handleForm}>
          <label for="linkName">Link Name: </label>
          <input name="linkName" type='text' value={formData.linkName} onChange={handleInputChange}/>
          <br/>
          <label for="URL">Link URL:  </label>
          <input name="linkURL" type='text' value={formData.linkURL} onChange={handleInputChange}/>
          <br/>
          <button id='btn' type='submit'>Submit</button>
      </form>
      
    </div>
  )
}

export default App
