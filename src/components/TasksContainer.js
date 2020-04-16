import React from "react";

import Tasks from "./Tasks";
import InputTask from "./InputTask";
import {getFromStorage} from "../utils/storage";
import {createTask, createToken, getTasks, verifyToken} from "../api/user";

class TasksContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      tasks: []
    };
    this.createTask = this.createTask.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
  }
  
  async componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj['token']) {
      //Verify token
      var res = await verifyToken(obj['token']);
      if (res['success']) {
        this.setState({token: obj['token']});
        console.log("VERIFIED");
      }
      else {
        res = await createToken();
        console.log("CREATED");
        this.setState({token: res['token']});
      }
    } else {
      res = await createToken();
      console.log("CREATED");
      this.setState({token: res['token']});
    }
    res = await getTasks(this.state.token);
    this.setState({tasks:res["tasks"]});
    console.log("TOKEN: " + this.state.token);
  }
  
  async createTask(task){
    var res = await createTask(task, this.state.token);
    if(res.success){
      this.setState((prev) => {
        prev.tasks.push(res.task);
        return {
          tasks: prev.tasks
        };
      });
    }
    console.log(this.state);
  }
  
  updateTasks(tasks){
    this.setState({tasks});
  }
  
  
  
  render(){
    return (
      <div className="container w-50 mt-5 mb-5I">
        <h1>To-Do List</h1>
        <Tasks token={this.state.token} tasks={this.state.tasks} updateTasks={this.updateTasks}/>
        <InputTask createTask={this.createTask}/>
      </div>
      
    );
  }
}

export default TasksContainer;
