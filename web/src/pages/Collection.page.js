import classNames from 'classnames';

function Collection(props) {
  const isLoading = props.collection === undefined;
  const hasCollection = (
    !isLoading &&
    props.collection !== null
  );
  const collectionIsEmpty = (
    props.collection &&
    props.collection.length === 0
  );

  if (isLoading) {
    return (
      <div className="notification">
        Loading...
      </div>
    );
  } if (!hasCollection) {
    return props.noCollectionNotification;
  } else if (collectionIsEmpty) {
    return props.emptyCollectionNotification;
  } else {
    return (
      <div className="frameGrid block">
        {props.collection && props.collection.map((picture) => {
          const isInteractive = props.onFocus !== undefined;
          return (
            <div
              key={picture.pixels}
              className={classNames({
                frameCell: true,
                isFocused: props.focusedPicture === picture,
                isInteractive: isInteractive
              })}
              onClick={() => isInteractive && props.onFocus(picture)}
            >
            </div>
          );
        })}
      </div>
    );
  }
}

export default Collection;