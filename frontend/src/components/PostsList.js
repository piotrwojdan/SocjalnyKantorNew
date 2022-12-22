import React from 'react';
import { format } from "date-fns";

function PostsList(props) {
  return (
    <div>
        {props.posts && props.posts.map(p => {
        return (
            <article class="media content-section">
            <div class="media-body">
              <div class="article-metadata">
                <p class="mr-2">Autor</p>
                <small class="text-muted">{p.dataUtworzenia}</small>
                {/* <small class="text-muted">{format(p.dataUtworzenia, "dd-MM-yyyy")}</small> */}
              </div>
              <h2><a class="article-title" href="/get/{p.id}">{p.tytul}</a></h2>
              <p class="article-content">{ p.tresc }</p>
            </div>
          </article>
        )})}
    </div>
  )
}

export default PostsList