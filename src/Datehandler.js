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



// Option 1: Call 1 method with 1 param value: handle separation in Handler
// Option 2: Call separate methods for each type of input (datelocal with 3 options, date with 1 option, number with 2 options) => still has to handle options in handler so out
// Option 3: Call 1 method with separate params


/* Option 1: 1 param
  ------------------

  Possible value options:
  1. just numbers (10)
  2. just numbers (13)
  3. date only (has dashes)
  4. Datetime minutes (with T, has dashes)
  5. Datetime seconds (with T, has dashes)
  6. Datetime ms (with T, has dashes)

  input: value
  output: format according to input… blurry…

  Output if input is unix: 6 different types of datetime
  Output if input is date(time): 2 types of unix

  Pro: when extending the input or outputs, i'll only have to handle things in the handler.

*/ 

/* Option 2: 2 params
  -------------------

  Pro: the fn call reflects the 2 separate components / the 2 separate conversion types
  Con: as long as there's no typechecking, me and other devs have to make sure to use the right params

  Input params: value, type
  According to (conversion) type, the value can be sent into separate directions right away.
  After that, same as option 1.

*/

/* Option 4: and now for some…
  ----------------------------

  None of the above yielded any good results.
  Instead I went and looked again the page components and started from there. 
  I basically started to look at my Datehandler as if it's an external library.

  What do I pass on to Datehandler? What's to the input?
  A string from the input field.

  How do I want to display the conversed result? 
  I needed to make sure to have a single source of date-truth that is always correct.
  Hence, I saved the make function in the component's state.
  
  => It should be the way described below. But… the methods use this.utcBase. The result is correct, but am I really following the single source of truth model?
  => Currently, my instance of the Datehandler is the source of truth. => Not really. See next sentence/thought.
  => The comp's state is holding the instance… But is it really? Yes it is, because the instance (new Datehandler) is sent to the state.
  If this is done, the state is (as should be) the single source of truth. => The state is the single source of truth since it holds the instance.
  Now, when rendering the conversion result, I can use the state's instance and call the various methods to display the conversion results.
  
  Pro: Since momentJS is pretty flexible in handling dates, there's no extra need to pass over or check for the different datetime input options.
*/
