import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "./index.css";
//import Navbar from "./components/navbar"
import "turn.js"; 



class Turn extends React.Component {
  static defaultProps = {
    style: {},
    className: "",
    options: {}
  };

  componentDidMount() {
    if (this.el) {
      $(this.el).turn(Object.assign({}, this.props.options));
    }
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    if (this.el) {
      $(this.el)
        .turn("destroy")
        .remove();
    }
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown = event => {
    if (event.keyCode === 37) {
      $(this.el).turn("previous");
    }
    if (event.keyCode === 39) {
      $(this.el).turn("next");
    }
  };

  handlePrev = () => {
     
      $(this.el).turn("previous");
  };

  handleNex=()=>{
      $(this.el).turn("next");
  }
  goto=(e)=>{
    $(this.el).turn("page",e);
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={Object.assign({}, this.props.style)}
        ref={el => (this.el = el)}
      >
        {this.props.children}
      </div>
    );
  }
}

const options = {
  width: 800,
  height: 600,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function(e, page) {
      console.log("Current view: ", $(this).turn("view"));
      if(($(this).turn("view").join("-")==='6-7')){
        console.log("ok")
      }
       
    }
  
  }
};
 

class App extends React.Component {
  state={
    pages:["https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
    "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
    "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
    "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
    "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg"],current:0
  }
  handlePrev=()=>{
    this.refs.turnChild.handlePrev()
  }
  handleNext=()=>{
    this.refs.turnChild.handleNex()
  }
  handlePage=(e)=>{
    this.setState({current:e.target.value});
  }
  show=()=>{
    this.refs.turnChild.goto(this.state.current)
  }

  render(){
  return (  
    <div>
    
       <Turn options={options} className="magazine" ref="turnChild">
      {this.state.pages.map((page, index) => (
        <div key={index} className="page">
          <img src={page} alt="" />
        </div> 
      )) }
    </Turn>
     <div> 
       <center>
          <input type ="button" onClick={this.handlePrev} value= "prev"></input>
        <input type="number"  min="0" onChange={(e)=>this.handlePage(e)} max="4" value={this.state.current} ></input>
        <input type ="button" onClick={this.show} value="go"></input>
        <input type ="button" onClick={this.handleNext} value= "next"></input>
       </center>
       
     </div>
    </div>
  
  );
}
};
ReactDOM.render(
  <App />,document.getElementById('root')
);