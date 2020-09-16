import React from 'react';
import './PlaylistComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function PlaylistComponent({
  name,
  image,
  description,
  count,
  selected,
  onClick,
}) {
  const background = selected
    ? { backgroundColor: 'lightGray' }
    : null;
  return (
    <div
      className="playlistComponentContainer"
      onClick={onClick}
      style={background}
    >
      {selected && (
        <FontAwesomeIcon icon={faCheckCircle} color="green" />
      )}
      <h3>{name}</h3>
      <img src={image} />
      <p>{description}</p>
      <h4>{count} songs</h4>
    </div>
  );
}

export default PlaylistComponent;
