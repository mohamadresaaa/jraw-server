export class ErrorMessage extends Error {
  constructor (name, message, status, properties, internalProperties) {
    super()
    this.status = status
    this.properties = properties
    this.internalProperties = internalProperties
    this.name = name
    this.message = message
  }

  publicVersion () {
    return new PublicErrorMessage(this)
  }

  static errNotFound (properties, internalProperties) {
    return new ErrorMessage("Not found", "The specified api does not exist", 404, properties, internalProperties)
  }
};

export class PublicErrorMessage {
  constructor (err) {
    this.name = err.name
    this.message = err.message
    this.status = err.status ? err.status : 500
    this.properties = err.properties
  }
};

export class PublicInfoMessage {
  constructor (message, status, properties) {
    this.message = message
    this.status = status
    this.properties = properties
  }

  static infoDeleted (resource, properties) {
    return new PublicInfoMessage(`${resource} was deleted`, 204, properties)
  }

  static infoCreated (resource, properties) {
    return new PublicInfoMessage(`${resource} was created`, 201, properties)
  }

  static infoUpdated (resource, properties) {
    return new PublicInfoMessage(`${resource} was updated`, 201, properties)
  }
};
