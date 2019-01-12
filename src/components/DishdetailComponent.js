import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderComments({ dish }) {
  if (dish != null)
    if (dish.comments != null) {
      const dishComments = dish.comments.map(comment => {
        return (
          <div>
            <p>{comment.comment}</p>
            <p>
              {comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        );
      });
      return (
        <div>
          <h5>Comments</h5>
          {dishComments}
        </div>
      );
    } else {
      return <div />;
    }
  else return <div />;
}
function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div />;
}
const DishDetail = props => {
  return <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish={props.dish} />
        </div>
      </div>
    </div>;
};

export default DishDetail;
