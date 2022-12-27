import React from 'react';

function PostsList(props) {
  return (
    <>
        {props.posts && props.posts.map(p => {
        return (
            <article className="media content-section">
            <div className="media-body">
              <div className="article-metadata">
                <p className="mr-2">Autor</p>
                <small className="text-muted">{p.dataUtworzenia}</small>
              </div>
              <h2><a className="article-title" href="/get/{p.id}">{p.tytul}</a></h2>
              <p className="article-content">{ p.tresc }</p>
            </div>
          </article>
        )})}
    </>
  )
}

export default PostsList