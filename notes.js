/***************************************************
 * Chaining syntax for queries to reuse/filter
 * 
 * Model.find({}).sort(field: 'asc', test: -1).limit(number).select().exec()
 * 1. Find All
 * 2. sort the data with name [either use query.sort({field: 'asc', test: -1}) or use query.sort('field -test') ] means field to be used in ascending order and test to be used in descending order
 * 3. limit the response with only (n:number) of sheets
 * 4. select specified fields only
 * 5. execute the query
 ***************************************************/

// source: https://mongoosejs.com/docs/api/query.html#query_Query-select

// String syntax very useful



/*************************** Sukhvir Answer ***************/
const contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

function lookUpProfile(name, prop) {
  // Only change code below this line
  let text = []
  for(let item of contacts)
  {
    if(item.firstName == name)
    {
      if(item.hasOwnProperty(prop))
      {
        text.push(item[prop])
      }
      else{
        return 'No such property'
      }
    }
  }
  if(text.length){
    return text[0]
  }
  else{
    return 'No such contact'
  }
  // Only change code above this line
}

// lookUpProfile("Akira", "likes");
console.log(lookUpProfile("Kristian", "lastName"))
console.log(lookUpProfile("Sherlock", "likes"))
console.log(lookUpProfile("Harry", "likes"))
console.log(lookUpProfile("Bob", "number"))
console.log(lookUpProfile("Bob", "potato"))
console.log(lookUpProfile("Akira", "address"))







/***************** Rahul Answer ******************/
 
 // Setup
 const contacts = [
   {
     firstName: "Akira",
     lastName: "Laine",
     number: "0543236543",
     likes: ["Pizza", "Coding", "Brownie Points"],
   },
   {
     firstName: "Harry",
     lastName: "Potter",
     number: "0994372684",
     likes: ["Hogwarts", "Magic", "Hagrid"],
   },
   {
     firstName: "Sherlock",
     lastName: "Holmes",
     number: "0487345643",
     likes: ["Intriguing Cases", "Violin"],
   },
   {
     firstName: "Kristian",
     lastName: "Vos",
     number: "unknown",
     likes: ["JavaScript", "Gaming", "Foxes"],
   },
 ];

 function lookUpProfile(name, prop) {
   // Only change code below this line
   let text = ""
   for(let item of contacts)
   {
     if(item.firstName == name)
     {
       if(item.hasOwnProperty(prop))
       {
         console.log(item[prop])
         break;
       }
       else{
         console.log('No such property')
         break
       }
     }
     if(contacts.indexOf(item)==contacts.length-1){
       console.log("No such contact")
     }
   }
   // Only change code above this line
 }

 // lookUpProfile("Akira", "likes");
 lookUpProfile("Kristian", "lastName")
 lookUpProfile("Sherlock", "likes")
 lookUpProfile("Harry", "likes")
 lookUpProfile("Bob", "number")
 lookUpProfile("Bob", "potato")
 lookUpProfile("Akira", "address")