import React from "react";
import './app.css'



function Keyboard(props) {
  var classname = props.extraclass==="width"? "buttoncalc  button_extraWidth" :
     props.extraclass==="position"? "buttoncalc  button-float" : "buttoncalc"  
  return (
    <button className ={classname}
      onClick={(e) => { props.onClick(e) }}
    >{props.value}
    </button>
  )
}


function Input(props) {
  return (
    <input type={"text"} className="displaycal" value={props.text_} />
  );
}





function InterfaceCal(props) {
  return (
    <div className="keyboard">
      {props.children}
    </div>

  )
}

class Calculadora extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text_value: ''
    }
  }


  keyNumber(n,style) {
    var plusclass = style;
     
    return (
      <Keyboard value={n} extraclass={plusclass}  onClick={
        () => {
          this.setState((state, props) => ({
            text_value: state.text_value + n
          }))
          if (n === "C") {
            this.setState({
              text_value: ''
            });
               
          } if (n === "=") {
            var resulte = this.calcule(this.state.text_value)
            this.setState({
              text_value: resulte
            })
          }
          
         
        }

      }
      />
    )
  }


  calcule(value) {
    var ops = '*-+/';
    var result = { value: '' };
    var oprator = '';

    [...ops].forEach((e) => {
      if (value.includes(e)) {

        oprator = e
        var index = value.indexOf(e)

        var n1 = value.slice(0, index);
        var n2 = value.slice(index + 1);
        result = { n1, n2 }
      }
    });

    switch (oprator) {
      case '+':
        result.value = parseFloat(result.n1) + parseInt(result.n2)
        break;
      case "-":
        result.value = parseFloat(result.n1) - parseInt(result.n2)
        break;
      case '/':
        result.value = parseFloat(result.n1) / parseInt(result.n2)
        break;
      case "*":
        result.value = parseFloat(result.n1) * parseInt(result.n2)
        break;
      default:
        break;
    }
    return result.value
  }

  render() {
    return (
      <div>



        
        <InterfaceCal>
       
          <div className="container">
            <div className="display">
              <Input text_={this.state.text_value} />
            </div>
          
          <div className="keygroup">

         
            <div>
              {this.keyNumber("C",'position')}
            </div>
            <div>
              {this.keyNumber(9)}
              {this.keyNumber(8)}
              {this.keyNumber(7)}
            </div>
            <div>
              {this.keyNumber(6)}
              {this.keyNumber(5)}
              {this.keyNumber(4)}
            </div>
            <div>
              {this.keyNumber(3)}
              {this.keyNumber(2)}
              {this.keyNumber(1)}
              {this.keyNumber(0,'width')}
              {this.keyNumber(".")}
            </div>
          </div>

     
          <div className="opratorkey">
            {this.keyNumber("+")}
            {this.keyNumber("-")}
            {this.keyNumber("/")}
            {this.keyNumber("*")}
            {this.keyNumber("=")}
          </div>
          </div>
        </InterfaceCal>
      </div>
    )

  }
}


function App() {
  return (
    <div>
      <Calculadora />
    </div>
  );
}

export default App;
