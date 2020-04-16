import {setInStorage} from "../utils/storage";

const url = process.env.REACT_APP_SERVER;

console.log("URL:" + url);

export function verifyToken(token) {
  console.log("VERIFY TOKEN");
  return fetch(url+'/users/verifyToken?token=' + token,
    {
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      return {
        success: json.success,
      };
    });
}

export function createToken() {
  console.log("CREATE TOKEN");
  return fetch(url+'/users/createToken', {
    method: 'POST',
  }).then(res =>  res.json())
    .then(json => {
      console.log(json);
      if(json.success){
        setInStorage('the_main_app', {token: json.token});
        return {
          success: json.success,
          token: json.token
        };
      }
      return {
        success: json.success,
        token: ""
      };
      
    });
}

export function getTasks(token) {
  console.log("GET TASKS");
  return fetch(url+'/users/getTasks?token=' + token,)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return {
        success: json.success,
        tasks: json.tasks
      };
    });
}

export function toggleTask(id, token) {
  return fetch(url+'/users/updateTaskStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      taskID: id,
      token: token
    })
  }).then(res => res.json())
    .then(json => {
      if(json.success){
        return {
          success: json.success,
          tasks: json.tasks
        };
      }
      return {
        success: json.success,
        message: json.message
      };
      
    });
}

export function createTask(task, token) {
  return fetch(url+'/users/createTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      task: task,
      token: token
    })
  }).then(res => res.json())
    .then(json => {
      if(json.success){
        return {
          success: json.success,
          task: json.task
        };
      }
      return {
        success: json.success,
        message: json.message
      };
      
    });
}

export function deleteTask(id, token) {
  return fetch(url+'/users/deleteTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      taskID: id,
      token: token
    })
  }).then(res => res.json())
    .then(json => {
      if(json.success){
        return {
          success: json.success,
        };
      }
      return {
        success: json.success,
        message: json.message
      };
      
    });
}


