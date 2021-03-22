import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filterType, setFilterType] = useState({ type: "all" });

  useEffect(() => {
    fetch('http://localhost:3001/pets')
     .then(r => r.json())
     .then(data => setPets(data))
  }, [])

  function onChangeType(e) {
    setFilterType(e.target.value)
  }

  function onFindPetsClick() {
    if (filterType !== "all") {
      fetch(`http://localhost:3001/pets/?type=${filterType}`)
      .then(r => r.json())
      .then(data => setPets(data))
    } else {
      fetch('http://localhost:3001/pets')
      .then(r => r.json())
      .then(data => setPets(data))
    }
  }

  function onAdoptPet(id) {
    const updatedPets = pets.map(pet => {
      if (pet.id === id) {
        return {...pet, isAdopted: true}
      } else {return pet}
    })
    setPets(updatedPets)
  }


  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters filterType={filterType} onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
