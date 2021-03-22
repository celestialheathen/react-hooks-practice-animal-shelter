import React from "react";
import Pet from "./Pet";

function PetBrowser({pets, onAdoptPet}) {


  const petsComponents = pets.map(pet => 
    <Pet pet={pet} onAdoptPet={onAdoptPet}/>)


  return (
  <div className="ui cards">
    { 
    petsComponents
    }
  </div>);
}

export default PetBrowser;
