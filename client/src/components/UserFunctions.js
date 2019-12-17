import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    
}
 

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
     if(response.data.error) return response.data;
      localStorage.setItem('myusertoken', response.data)
     
      return {islogined:true}
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getUser = async (url) => {
  const res = await fetch(url,
  {
      method: "POST",
  });
  if(!res.ok){
    throw new Error(`Cud not fatch ${url} Resivd ${res.status}`)
  }
  const body = res.json();
 return body
}

export const getTime = (date)=>{
  return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

