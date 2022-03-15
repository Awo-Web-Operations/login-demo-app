import React from 'react';

class ComponentToPrint extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { value, mealPrep, ingredientsList, categories, utensilsList } = this.props;
        let displayedCategories = ''
        displayedCategories = categories.map((cat) => cat + ', ');
        let displayedIngredients = ingredientsList.map((ingredientSyntax) => <li key={ingredientSyntax} >{ingredientSyntax}</li>);
        let displayedUtensils =  utensilsList.map((utensil) => <li key={utensil} >{utensil}</li>);
        //  displayedCategories+= '</div>'
    
        console.log("categories are:")
        console.log(this.props.categories);
        console.log("displayed categories are:")
        console.log(displayedCategories);
        
        return (
            <div>
               <div className="container">
                <div className="row" style={{ width: "100%" }}>
                  <div className="detail-firstCol col-md-5 col-sm-12" >
                    <img src= {this.props.mealImageData} alt="Meal Image^" ></img>
                    Meal Image^
                  </div>
                </div>
              </div>
              {displayedCategories}<br></br>
              Prep Time: {this.props.prepTime} | Cook Time: {this.props.cookTime} | Serves {this.props.serves} people<br></br>
              <img alt="Logo"></img> {this.props.mealName}<br></br>
              Ingredients:<br></br>
              <ul>{displayedIngredients}</ul><br></br>
              Utensils Needed:
              <ul>{displayedUtensils}</ul>

              {/* Page 2 */}
              <div style={{"pageBreakBefore": "always"}}>
                <div> 
                  {this.props.instructionChunk1.title}<br></br>
                  {this.props.instructionChunk1.dataName}<br></br>
                  {this.props.instructionChunk1.instructionSteps}
                  {this.props.instructionChunk2.title}<br></br>
                  {this.props.instructionChunk2.dataName}<br></br>
                  {this.props.instructionChunk2.instructionSteps}
                </div>
                <div> 
                  {this.props.instructionChunk3.title}<br></br>
                  {this.props.instructionChunk3.dataName}<br></br>
                  {this.props.instructionChunk3.instructionSteps}
                  {this.props.instructionChunk4.title}<br></br>
                  {this.props.instructionChunk4.dataName}<br></br>
                  {this.props.instructionChunk4.instructionSteps}
                </div>
                <div> 
                  {this.props.instructionChunk5.title}<br></br>
                  {this.props.instructionChunk5.dataName}<br></br>
                  {this.props.instructionChunk5.instructionSteps}
                  {this.props.instructionChunk6.title}<br></br>
                  {this.props.instructionChunk6.dataName}<br></br>
                  {this.props.instructionChunk6.instructionSteps}
                </div>
                {this.props.tips}
                <div>Connect with us @chop_soul_full</div>
              </div>

            </div>
        );
    }
}

export default ComponentToPrint