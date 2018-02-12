import moment from 'moment'

class Datehandler {
  constructor(date) {
    this.utcBase = date
  }

  static make(input) {
    const adjustedInput = this.processInput(input)

    // directly passing the input to utc() would result in a wrong date, 
    // with an offset by the local time
    const date = moment.utc(moment(adjustedInput))
    return new Datehandler(date)
  }

  static processInput(input) {
    let processedInput = null
    if (!input.includes('-')) {
      //normalize unixinput to 13 chars
      processedInput = input.length === 10 ? parseInt(input.concat('000'), 10) : parseInt(input, 10)
    } else {
      processedInput = input
    }
    return processedInput
  }

  // Methods return a formatted version of utcBase
  // except for getIso8601Utc(), for the life of me…
  getUnix() {
    return moment(this.utcBase).unix()
  }

  getUnixMs() {
    return moment(this.utcBase).valueOf()
  }

  get12Hrs() {
    return this.utcBase.local().format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  get24Hrs() {
    return this.utcBase.local().format("dddd, MMMM Do YYYY, H:mm:ss")
  }

  getIso8601Utc() {
    return moment(this.utcBase).utc().format()
  }

  getIso8601UtcMs() {
    return this.utcBase.toISOString()
  }

  getIso8601() {
    return this.utcBase.local().format()
  }

  getRfc2822() {
    return this.utcBase.local().format('dddd, DD-MMM-YY HH:mm:ss Z')
  }

}

export default Datehandler