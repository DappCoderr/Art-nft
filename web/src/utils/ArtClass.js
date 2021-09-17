class Art {
  constructor(id, name, description, imageURL, price) {
    this._id = id
    this.name = name
    this.description = description
    this.imageURL = imageURL
    this.price = price || 0
  }

  get id() {
    return `Art${this._id}`;
  } 

  get image() {
    return `${process.env.PUBLIC_URL}/Images/${this.id}.png`
  }
}

export default Art

