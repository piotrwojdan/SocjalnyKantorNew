export default class APIService {
  static UpdatePost(id, body){
    return  fetch(`http://127.0.0.1:5001/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
  }
}