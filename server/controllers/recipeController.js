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
        const Indian = await Recipe.find({ 'category':'Indian'}).limit(limitNumber);

        const food ={latest, Indian};

        res.render('index', { title: 'Cooking  - Homepage', categories, food });
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


/**
 * Get /recipe/:id
 * Recipe
 */

exports.exploreRecipe = async(req, res) => {
    try{

        let recipeId= req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Cooking Blog - Recipe', recipe });
    } catch (error) {
        res.status(500).send({message : error.message|| "Error Occured"});
    }    
 
}


/**
 * Post /Search
 * Search
 */
exports.searchRecipe = async(req, res) => {
    try{

        let searchTerm= req.body.searchTerm;
        let recipe = await Recipe.find( { $text: {$search: searchTerm, $diacriticSensitive: true} } );
        res.render('search', {title: 'Cooking Blog-Search', recipe});
    } catch (error) {
        res.status(500).send({message : error.message|| "Error Occured"});
    }    
 
}

/**
 * get /Submit
 * Submit
 */
exports.submitRecipe = async(req, res) =>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', {title: 'Cooking Blog - Submit Recipe',infoErrorsObj, infoSubmitObj });
}

/**
 * get /Submit on Post
 * Submit
 */
exports.submitRecipeOnPost = async(req, res) =>{

    try {

        const newRecipe =new Recipe({
            name: 'New Chocolate Cake',
            description: 'Chocolate Cake description',
            email : 'itismissing@gmail.com',
            ingredients : 'water',
            category : 'Mexican',
            image:'Mexican-food.png'
        });

        await newRecipe.save();


        req.flash('infoSubmit','Recipe has been Added')
        res.redirect('/submit-recipe');
    } catch (error) {
        req.flash('infoErrors',error)
        res.redirect('submit-recipe')
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


// async function insertDymmyRecipeData(){

//     try{
//         await Recipe.insertMany([
//             {
//                 "name":"Idly",
//                 "description":`grind rice flour, Urud dall, Fenugreek seed; ferment for one to twodays`,
//                 "email":"itismissing@gmail.com",
//                 "ingredients":[
//                     "rice flour",
//                     "Urud dhal",
//                     "Fenugreek seed"
//                 ],
//                 "category":"Indian",
//                 "image":"Idly.png"
//             },
//             {
//                 "name":"Dosai",
//                 "description":`grind rice flour, Urud dhal, Fenugreek seed; ferment for one to twodays`,
//                 "email":"itismissing@gmail.com",
//                 "ingredients":[
//                     "rice flour",
//                     "Urud dhal",
//                     "Fenugreek seed"
//                 ],
//                 "category":"Indian",
//                 "image":"Dosai.png"
//             },
            
//           ]);

//     }catch(error){
//         console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();

