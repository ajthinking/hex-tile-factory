export default {

	state: {
        map: {
            strategy: 'RandomOffset',
            iterations: 4,
            size: 4,
            seed: 12345,
            coordinates: false,
        }
	},

	getters: {
    //    getCategoryFormGetters(state){ //take parameter state

    //       return state.category
    //    }
	},

	actions: {
    //    allCategoryFromDatabase(context){

    //       axios.get("api/category")

    //            .then((response)=>{
    //               console.log(response.data.categories)
    //               context.commit("categories",response.data.categories) //categories will be run from mutation

    //            })

    //            .catch(()=>{
                  
    //               console.log("Error........")
                  
    //            })
    //    }
	},

	mutations: {
       updateStrategy(state, strategy) {
          return state.map.strategy = strategy
       }
	}
}