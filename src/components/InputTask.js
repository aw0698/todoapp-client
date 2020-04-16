import React from "react";

class InputTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      task: ""
    };
    
    this.updateTask = this.updateTask.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  
  updateTask(e) {
    this.setState({
      task: e.target.value
    });
  }
  
  addTask() {
    this.props.createTask(this.state.task);
    this.setState({task: ""});
  }
  
  render() {
    const rowClassName = "row bg-light text-dark rounded mt-2";
    const taskClassName = "col rounded-left p-0";
    const submitClassName= "col-3 p-0";
  
    // // const rowClassName = "row bg-light text-dark rounded mt-2";
    // const checkboxClassName = "col-2 bg-secondary rounded-left d-flex align-items-center";
    // // const taskClassName= "col d-flex justify-content-start";
    // const compTaskClassName = taskClassName + " strikethrough";
    return (
      <div className="container w-50">
        <div className={rowClassName}>
          <div className={taskClassName}>
            <input
              className="form-control rounded-left pl-2 pr-2"
              type="text"
              onChange={this.updateTask}
              placeholder="Type New Task Here..."
              value={this.state.task}
            />
          </div>
          <div className={submitClassName}>
            <button type="button" className="btn btn-primary btn-block" onClick={this.addTask}>Add</button>
          </div>
        </div>
      </div>
      
    );
  }
}

export default InputTask;
