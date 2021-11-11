"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Enter 'yes' if you would like to search by name. If you would like to search by traits, enter 'single' or 'multiple'", autoValid).toLowerCase();
  let searchResults;
  
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      console.log(searchResults);
      break;
    case 'single':
      searchResults = searchBySingleTrait(people);
      console.log(searchResults);
      break;
    case 'multiple':
      searchResults = searchByMultipleTraits(people);
      console.log(searchResults);
      break;
    default:
      console.log(displayPeople());
    
app(people); // restart app
    break;
  
  }

  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    console.log(displayPerson(0))

    break;
    case "family":
    // TODO: get person's family
    console.log("Parents:" + person[0].parents);
    console.log("Spouse:" + person[0].currentSpouse);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

function searchBySingleTrait(people){
  let searchType = promptFor("Do you know a trait of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      let searchOption = promptFor(
        "Which trait would you like to search? (input number) \n" +
        "1. Eye Color \n" + 
        "2. Gender \n" + 
        "3. Height \n" + 
        "4. Weight \n" + 
        "5. Occupation \n", 
      autoValid
      );

      let filteredSearch = people;

      searchOption.split(' ');
        if(searchOption.includes(1)) {
          filteredSearch = searchByEyeColor(filteredSearch)
        }

        if(searchOption.includes(2)){
            filteredSearch = searchByGender(filteredSearch)
        }
        
        if(searchOption.includes(3)) {
            filteredSearch = searchByHeight(filteredSearch)
        }
        
        if(searchOption.includes(4)){
            filteredSearch = searchByWeight(filteredSearch)
        }
          
        if(searchOption.includes(5)){
            filteredSearch = searchByOccupation(filteredSearch)
        }

        //add check for 1 result
        return displayPeople(filteredSearch)
      }
}

function searchByMultipleTraits(people){
  let filteredSearch = people;
  
  let searchType = promptFor("Do you know the person's eye color? Enter 'yes' or 'no'", yesNo).toLowerCase();

    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByEyeColor(filteredSearch);
      console.log(filteredSearch);
    }
   
  searchType = promptFor("Do you know the person's gender? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByGender(filteredSearch);
      console.log(filteredSearch);
    }

  searchType = promptFor("Do you know the person's weight? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByWeight(filteredSearch);
      console.log(filteredSearch);
    }

  searchType = promptFor("Do you know the person's height? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByHeight(filteredSearch);
      console.log(filteredSearch);
    }
    
  searchType = promptFor("Do you know the person's occupation? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if(searchType.toLowerCase() === 'yes'){
      filteredSearch = searchByOccupation(filteredSearch);
      console.log(filteredSearch);
    }
  // add check for one result
  displayPeople(filteredSearch);
  return filteredSearch
  }



//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);
  
  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
    return foundEyeColor;
}

//TODO: add other trait filter functions here. Done

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid);
  
  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
    return foundGender;
  
  }


function searchByHeight(people){
  let height = promptFor("What is the person's height?", autoValid);
  
  let foundHeight = people.filter(function(potentialMatch){
    if(potentialMatch.height === height){
      return true;
    }
    else{
      return false;
    }
  })
    return foundHeight;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", autoValid);
  
  let foundWeight = people.filter(function(potentialMatch){
    if(potentialMatch.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })
    return foundWeight;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid);
  
  let foundOccupation = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
    return foundOccupation;
}




//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender:" + person.gender + "\n";
  personInfo += "Height:" + person.height + "\n";
  personInfo +=  "Weight:" + person.weight + "\n";
  personInfo +=  "Occupation:" + person.occupation + "\n";
  personInfo +=  "Eye Color:" + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
  return personInfo
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion
