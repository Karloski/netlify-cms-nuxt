const validator = require('validator')
const xss = require('xss')
const nodemailer = require('nodemailer')

const rejections = {
  name: {
    validate: v => v.length < 1 || v.length > 30,
    message: 'Name is empty or greater than the maximum (30 characters)'
  },
  email: {
    validate: v => !validator.isEmail(v),
    message: 'Your email did not appear to be valid'
  },
  msg: {
    validate: v => (v = String(v)) && (v.length < 1 || v.length > 1000),
    message: 'Your message is empty or greater than the maximum (1000 characters)'
  }
}

const validateAndSanitize = (key, value) => {
  return (key in rejections) && !rejections[key].validate(value) && xss(value)
}

const sendMail = async (name, email, msg) => {
  const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtpout.europe.secureserver.net',
    port: 465,
    auth: {
      user: 'me@carlwithak.me.uk',
      pass: '@$kWjQ-4v9qk%pc'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  return await transporter.sendMail({
    from: 'noreply@carlwithak.me.uk',
    to: 'me@carlwithak.me.uk',
    subject: 'New contact form message',
    text: `Hi Karl.\n\nYou have a new message from ${name} (${email}).\n\nThey said:\n\n${msg}`,
    html: `<html<body><p>Hi Karl.</p><p>You have a new message from ${name} (${email}).</p><p>They said:</p><p>${msg}</p></body></html>`
  })
}

// eslint-disable-next-line require-await
exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: {
        Allow: 'Post'
      }
    }
  }

  try {
    const data = JSON.parse(event.body)
    const attributes = ['name', 'email', 'msg']

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(data)
    // }

    if (attributes.some(n => !(n in data))) {
      throw new Error(`One of ${attributes.toString()} not provided`)
    }
  
    // Map each attribute name to the validated and sanitized equivalent (false if validation failed)
    const sanitized = attributes.map(n => n in data && validateAndSanitize(n, data[n]))
    const errors = {}
  
    for (let i = 0; i < sanitized.length; i++) {
      if (!sanitized[i]) {
        errors[attributes[i]] = rejections[attributes[i]].message
      }
    }
  
    if (Object.keys(errors).length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'There was an issue with the data you provided',
            errors: {
              ...errors
            }
          }
        )
      }
    }

    await sendMail(...sanitized)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e.message })
    }
  }
}
