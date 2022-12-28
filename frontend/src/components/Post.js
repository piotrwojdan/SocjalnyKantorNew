import React from "react";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";


function Post(props) {

    const { id } = useParams();

    const [post, setPost] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/get/'+id, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setPost(resp))
    .catch(err => console.log(err))
  }, [])

    return (
        <>
        <article className="media content-section">
            <div className="media-body">
                <div className="article-metadata">
                {/* <a className="mr-2" href="#">{ post.author.imie }</a> */}
                <small className="text-muted">{ post.dataUtworzenia }</small>
                    <div>
                        {/* <div>{{ current_user.type }}</div> */}
                        <Link to="/editpost"><p className="btn btn-secondary btn-sm mt-1 mb-1">Edytuj</p></Link>
                        <button type="button" className="btn btn-danger btn-sm m-1" data-toggle="modal" data-target="#deleteModal">Usuń</button>
                    </div>
                </div>
                <h2 className="article-title">{ post.tytul }</h2>
                <p className="article-content">{ post.tresc }</p>
            </div>
        </article>

        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Usunąć post?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                <form action="{{ url_for('delete_post', post_id=post.id) }}" method="POST">
                    <input className="btn btn-danger" type="submit" value="Usuń"/>
                </form>
                </div>
            </div>
            </div>
        </div>
    </>
    )
}

export default Post;