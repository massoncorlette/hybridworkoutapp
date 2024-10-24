// using local storage for now 

export const manageData = function() {
  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  function getData(key) {
    const data = localStorage.getItem(key);
  
    if (data) {
      return JSON.parse(data);
    } else {
      return null;   
    }
  }
  
  function deleteData(key) {
    localStorage.removeItem(key);
  }
  return {
    saveData:saveData,
    getData:getData,
    deleteData:deleteData
  }
}

//will need async functions to get data on server opposed to local in future