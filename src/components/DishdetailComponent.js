import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Col, Row,Label, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    //state for modal
    this.state = {
      modal: false
    };
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  } // End constructor

  toggleCommentModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleCommentSubmit(values){
    console.table("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
    this.toggleCommentModal();
   
  }

  render() {
    return <div>
      <Button
       outline color="secondary"
      onClick={this.toggleCommentModal}>
      <span className="fa fa-pencil"></span> Submit Comment
      </Button>
      
      {/* Modal Add Comment Content */}
      <Modal isOpen={this.state.modal} toggle={this.toggleCommentModal}>
        <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <div className="col-12 col-md-12">
            <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="yourrating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".yourrating" name="yourrating" className="form-control" id="yourrating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="authorcomment" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".authorcomment" id="authorcomment" name="authorcomment"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{ minLength: minLength(2), maxLength: maxLength(15) }}  
                    /> {/* Limit length */}
                    <Errors className="text-danger" model=".authorcomment" show="touched" messages={{ minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }} />  {/* Catch error if needed */}
                  </Col> 
              </Row>
              <Row className="form-group">
                <Label htmlFor="yourcomment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    placeholder="Comment"
                    className="form-control"
                    validators={{ minLength: minLength(1), maxLength: maxLength(140) }}   
                    />
                    <Errors className="text-danger" model=".comment" show="touched" messages={{ minLength: 'This Field cannot be empty', maxLength: 'Maximum 140 characters' }} />  
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </div>
          </ModalBody>
        
          
        
      </Modal>
    </div>;
  } //End of render CommentModalForm
} // End for Class ComentModalForm 






function RenderComments({ comments }) {
  if (comments != null) {
    const dishComments = comments.map(comment => {
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
  } else return <div />;
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
const DishDetail = (props) => {
  return <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
          <CommentForm />
        </div>
      </div>
    </div>;
};

export default DishDetail;
