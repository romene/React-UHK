import React, { Component } from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom"; 
// import for Redux
import { connect } from "react-redux"; // connect React Component to the Redux Store 


// map react store to become available to the component
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    };
  }

 

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }


  render() {
    const HomePage = () => {
      return (<Home
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />)
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
      );
    };

    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={Contact} />} />
              <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
//Incase you're using Router WithRouter  connect(mapStateToProps)(Component)
