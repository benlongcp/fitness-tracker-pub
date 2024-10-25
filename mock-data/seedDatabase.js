import mongoose from 'mongoose';
import {User, db} from '../server/db/index.js'
import exampleWorkouts from './exampleWorkouts.js'
import exampleNutrition from './exampleNutrition.js';

db.on('open', () => {

  let deletedCount = 0;
  let successCount = 0;
  let failureCount = 0;


  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                                 INITIALIZING USERS FOR SEED                              */

  function randomWorkouts(){
    if (
      exampleWorkouts === undefined ||
      exampleWorkouts.length === undefined || 
      exampleWorkouts.length === 0
    ) {
      return console.error('Error during database seed; exampleWorkouts undefined.')
    }

    let max = exampleWorkouts.length;
    let rand = Math.floor(Math.random() * max);

    return exampleWorkouts.slice(0, rand);
  }

  function randomNutrition(){
    
    if (
      exampleNutrition === undefined ||
      exampleNutrition.length === undefined || 
      exampleNutrition.length === 0
    ) {
      return console.error('Error during database seed; exampleNutrition undefined.')
    }
    
    let max = exampleNutrition.length;
    
    let rand = Math.floor(Math.random() * max);

    return exampleNutrition.slice(0, rand);
  }

  const userOne = {
    username: 'Jeremy Hernandez',
    workouts: randomWorkouts(),
    nutrition: randomNutrition()
  }

  const userTwo = {
    username: 'Benjamin Long',
    workouts: randomWorkouts(),
    nutrition: randomNutrition()
  }

  const userThree = {
    username: 'Justin Sandrock',
    workouts: randomWorkouts(),
    nutrition: randomNutrition()
  }

  const userFour = {
    username: 'Olivia Baylor',
    workouts: randomWorkouts(),
    nutrition: randomNutrition()
  }

  const userFive = {
    username: 'Ethan Little',
    workouts: randomWorkouts(),
    nutrition: randomNutrition()
  }
  //////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                    PURGE DATABASE AND REPOPULATE WITH EXAMPLE USERS                      */
  /*  !!WARNING!!: Running npm seed command WILL delete users with matching usernames in db   */
  const createUserOne = User.findOneAndDelete({username: userOne.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then(() => {
      successCount += 1;
    })
    .catch( () => {
      failureCount += 1
    })

  const createUserTwo = User.findOneAndDelete({username: userTwo.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( () => {
      failureCount += 1
    })


  const createUserThree = User.findOneAndDelete({username: userThree.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( () => {
      failureCount += 1
    })

  const createUserFour = User.findOneAndDelete({username: userFour.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( () => {
      failureCount += 1
    })
    
  const createUserFive = User.findOneAndDelete({username: userFive.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( (error) => {
      console.error(error);
      failureCount += 1
    })  
  //////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////
  /*               WAITS FOR ALL OPERATIONS TO CONCLUDE, THEN LOGS MESSAGE                    */
  Promise.all([createUserOne, createUserTwo, createUserThree, createUserFour, createUserFive])
    .then(() => {
      console.log(
        `${deletedCount} successful deletions.\n${successCount} insertions.\n${failureCount} failures.`
      )
    })
  //////////////////////////////////////////////////////////////////////////////////////////////

})