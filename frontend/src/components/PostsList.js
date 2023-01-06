import React from 'react';
import { Link } from 'react-router-dom'

function PostsList(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setPosts(resp))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
        {posts && posts.map(p => {
          const address = '/post/' + p.id; 
        return (
          <li key={p.id}>
            <article className="media content-section">
            <div className="media-body">
              <div className="article-metadata">
                <p className="mr-2">Autor</p>
                <small className="text-muted">{p.dataUtworzenia}</small>
              </div>
              <Link to={address}><h2 className="article-title">{p.tytul}</h2></Link>
              <p className="article-content">{ p.tresc }</p>
            </div>
          </article>
          </li>
        )})}
    </>
  )
}

export default PostsList