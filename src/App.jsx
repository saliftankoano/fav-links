import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tableData, setTableData]= useState([]);

  const [formData, setFormData]= useState({
    linkName: 'Default',
    linkURL: 'Default Url'
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleForm = (e) => {
    e.preventDefault();

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
  const postLinks = async ()=>{
    let testLink = {name: 'Test 12.12.2023', url: 'www.test.com'};
    try {
      let response = await fetch('/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testLink)
      });
      console.log(response);
      let message = response.text();
      console.log(message);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    postLinks()
  }, [])
  return (
    <div id='all'>
      <h1>My Favorite Links</h1>
      <p>Add a new URL and Name to the table</p>
      <table>
        <thead>
            <tr id='tb-header'>
                <th>Name</th>
                <th>URL</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td id='linkName'>{row.linkName}</td>
              <td id='linkUrl'><a  href={row.linkURL}>{row.linkURL}</a></td>
              <td><button onClick={()=> handleDeleteRow(index)} id='btn'>Delete</button></td>
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
