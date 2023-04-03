require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


/**
 * Get /
 * Homepage
 */

exports.homepage = async(req, res) => {
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).sort({_id: -1}).limit(limitNumber);
        const latest = await Recipe.find({}).limit(limitNumber);

        const food ={latest};

        res.render('index', { title: 'Cooking Blog - Homepage', categories, food });
    } catch (error) {
        res.status(500).send({message : error.message|| "Error Occured"});
    }    
 
}


/**
 * Get /categories
 * Categories
 */

exports.exploreCategories = async(req, res) => {
    try{
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categories });
    } catch (error) {
        res.status(500).send({message : error.message|| "Error Occured"});
    }    
 
}





// async function insertDymmyCategoryData(){

//     try{
//         await Category.insertMany([
//             {
//                 "name":"Thai",
//                 "image":"Thai-food.jpg"
//             },
//             {
//                 "name":"American",
//                 "image":"American-food.jpg"
//             },
//             {
//                 "name":"Chinese",
//                 "image":"Chinese-food.jpg"
//             },
//             {
//                 "name":"Mexican",
//                 "image":"Mexican-food.jpg"
//             },
//             {
//                 "name":"Indian",
//                 "image":"Indian-food.jpg"
//             },
//             {
//                 "name":"Spanish",
//                 "image":"Spanish-food.jpg"
//             },
//           ]);

//     }catch(error){
//         console.log('err', + error)
//     }
// }

// insertDymmyCategoryData();


async function insertDymmyRecipeData(){

    try{
        await Recipe.insertMany([
            {
                "name":"Idly",
                "description":`grind rice flour, Urud dall, Fenugreek seed; ferment for one to twodays`,
                "email":"itismissing@gmail.com",
                "ingredients":[
                    "rice flour",
                    "Urud dhal",
                    "Fenugreek seed"
                ],
                "category":"Indian",
                "image":"Idly.png"
            },
            {
                "name":"Dosai",
                "description":`grind rice flour, Urud dhal, Fenugreek seed; ferment for one to twodays`,
                "email":"itismissing@gmail.com",
                "ingredients":[
                    "rice flour",
                    "Urud dhal",
                    "Fenugreek seed"
                ],
                "category":"Indian",
                "image":"Dosai.png"
            },
            
          ]);

    }catch(error){
        console.log('err', + error)
    }
}

insertDymmyRecipeData();

