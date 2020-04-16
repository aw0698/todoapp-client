import React from "react";
import { deleteTask, toggleTask } from "../api/user";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
    this.toggleShowDelete = this.toggleShowDelete.bind(this);
  }
  
  async toggleDone(arrayIndex, id){
    var res = await toggleTask(id, this.props.token);
    if(res.success){
      this.props.updateTasks(res["tasks"]);
    }
  }
  
  async deleteTask(id, index){
    var res = await deleteTask(id, this.props.token);
    if(res.success) {
      let newTasks = this.props.tasks.filter(task => task.id !== id);
      this.props.updateTasks(newTasks);
    }
  }
  
  toggleShowDelete(index, doShow){
    let newTasks = this.props.tasks;
    newTasks[index].showDelete = doShow;
    this.props.updateTasks(newTasks);
  }
  
  
  render() {
    const rowClassName = "row bg-light text-dark rounded mt-2";
    const checkboxClassName = "col-2 bg-secondary rounded-left d-flex align-items-center";
    const taskClassName= "col d-flex justify-content-start text-left d-flex justify-content-between";
    const compTaskClassName = taskClassName + " strikethrough";
    const deleteClassName = "col-2 d-none";
  
    return (
      <div className="container w-50">
        {this.props.tasks.length > 0 && this.props.tasks.map((task,index)=>
          <div className={rowClassName} key={index}>
            <div className={checkboxClassName}>
              <input type="checkbox" onChange={() => this.toggleDone(index, task["id"])} checked={task["isDone"]}/>
            </div>
            <div
              className={task["isDone"]?compTaskClassName: taskClassName}
              onMouseOver={() => this.toggleShowDelete(index, true)}
              onMouseOut={() => this.toggleShowDelete(index, false)}
            >
              {task["content"]}
              <div className={task.showDelete? "col-2": deleteClassName}>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => this.deleteTask(task.id, index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} color="#FF304A"/>
                </button>
              </div>
            </div>
            
          </div>
        )}
  
        {this.props.tasks.length === 0 && <div>No tasks</div>}
      </div>
    );
  }
}

export default Tasks;
